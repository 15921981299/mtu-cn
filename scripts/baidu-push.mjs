#!/usr/bin/env node
/**
 * 百度搜索资源平台——主动推送（普通收录 / API 提交）。
 *
 * 用法：
 *   node scripts/baidu-push.mjs                  # 增量推送 dist/ 全部板块
 *   node scripts/baidu-push.mjs --dry-run        # 只看会推什么，不发请求
 *   node scripts/baidu-push.mjs --chunk parts    # 只推零件页板块（可重复传多个）
 *   node scripts/baidu-push.mjs --all            # 忽略 state 全量重推
 *   node scripts/baidu-push.mjs --urls list.txt  # 推送一个手工维护的 URL 清单
 *
 * 前置条件（缺一不可，脚本会在缺失时明确报错）：
 *   1. 构建已产出 dist/sitemap-index.xml（板块拆分后的索引，见
 *      src/data/sitemap-chunks.ts）；
 *   2. 站点已在百度搜索资源平台验证——site 参数必须与验证站点**完全一致**
 *      （协议、有无 www 都要一致），默认从 sitemap URL 推导，不匹配时用
 *      --site 显式指定；
 *   3. 在「数据提交 → 普通收录 → API 提交」拿到 token：
 *        Git Bash:  export BAIDU_PUSH_TOKEN=xxxx
 *        Windows :  setx BAIDU_PUSH_TOKEN xxxx   （新开终端后生效）
 *
 * 接口规格（百度搜索资源平台文档）：
 *   POST https://data.zz.baidu.com/urls?site=<站点>&token=<密钥>
 *   Content-Type: text/plain；正文每行一个完整 URL，UTF-8、无 BOM、无空行；
 *   单次上限 2000 条；普通站点每日配额 10 万条。
 *   成功（HTTP 200）：{"success":n,"remain":n,"not_same_site":[],"not_valid":[]}
 *   失败（4xx/5xx）：{"error":码,"message":"..."}，常见码见 ERROR_HINTS。
 *
 * state 文件默认 scripts/data/baidu-push-state.json（已列入 .gitignore），
 * 记录推送历史实现「只推新 URL」。零件数据没变时重复推是浪费配额，所以默认
 * 增量；内容大改后用 --all 主动重推。被 301/noindex 下线的 URL 不会自动从
 * state 清除（下次上线会重新入列），需要清理时加 --prune。
 */

import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** 百度硬限制：单次最多 2000 条，超出直接报 "only 2000 urls are allowed once"。 */
const BAIDU_BATCH_LIMIT = 2000;

/** 百度返回的错误码 → 人话 + 处理建议。 */
const ERROR_HINTS = {
  400: {
    'site error': '站点未在站长平台验证，或 site 参数与验证站点不一致（协议/有无 www 都要一致）。用 --site 显式指定验证时填写的完整地址。',
    'empty content': 'POST 内容为空——检查 --urls 文件是否有内容。',
    'only 2000 urls are allowed once': '超过单次 2000 条上限（脚本内部已分批，正常不会出现；如用 --limit 调大了请调回）。',
    'over quota': '超过每日推送配额（普通站点默认 10 万/天），今天剩下的推送都无效，明天再跑。',
  },
  401: 'token 无效。到「数据提交 → 普通收录 → API 提交」重新生成，并确认环境变量 BAIDU_PUSH_TOKEN 已在新终端里生效。',
  404: '接口地址不存在——几乎一定是 site/token 参数里混入了空格或换行。',
  500: '百度侧临时异常，通常稍后重试即可。',
};

// ── 参数解析 ────────────────────────────────────────────────────────────

const VALUE_FLAGS = new Set([
  '--dist',
  '--state',
  '--site',
  '--token',
  '--endpoint',
  '--chunk',
  '--urls',
  '--limit',
  '--delay',
]);

function parseArgs(argv) {
  const opts = {
    dist: 'dist',
    state: 'scripts/data/baidu-push-state.json',
    site: process.env.BAIDU_PUSH_SITE || null,
    token: process.env.BAIDU_PUSH_TOKEN || null,
    endpoint: process.env.BAIDU_PUSH_ENDPOINT || 'https://data.zz.baidu.com/urls',
    chunks: [],
    urls: null,
    limit: BAIDU_BATCH_LIMIT,
    delay: 500,
    all: false,
    dryRun: false,
    prune: false,
    verbose: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const eq = arg.indexOf('=');
    const key = eq === -1 ? arg : arg.slice(0, eq);
    let value = eq === -1 ? undefined : arg.slice(eq + 1);
    if (value === undefined && VALUE_FLAGS.has(key)) {
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        value = next;
        i++;
      }
    }
    switch (key) {
      case '--dist':
        opts.dist = value;
        break;
      case '--state':
        opts.state = value;
        break;
      case '--site':
        opts.site = value;
        break;
      case '--token':
        opts.token = value;
        break;
      case '--endpoint':
        opts.endpoint = value;
        break;
      case '--chunk':
        if (value) opts.chunks.push(value);
        break;
      case '--urls':
        opts.urls = value;
        break;
      case '--limit':
        opts.limit = Number(value);
        break;
      case '--delay':
        opts.delay = Number(value);
        break;
      case '--all':
        opts.all = true;
        break;
      case '--dry-run':
        opts.dryRun = true;
        break;
      case '--prune':
        opts.prune = true;
        break;
      case '--verbose':
        opts.verbose = true;
        break;
      case '--help':
      case '-h':
        opts.help = true;
        break;
      default:
        console.warn(`! 未知参数 ${key}（--help 查看用法），已忽略。`);
    }
  }
  return opts;
}

const HELP = `百度主动推送（普通收录 API 提交）

  node scripts/baidu-push.mjs [选项]

选项：
  --dist <dir>      构建输出目录（默认 dist）
  --chunk <name>    只推送指定板块，可重复：parts / catalog / products /
                    models / content / pages
  --site <url>      站长平台验证的站点，默认从 sitemap 推导；验证的是 www
                    子域时必须显式指定（协议+www 完全一致）
  --token <key>     推送密钥，默认读环境变量 BAIDU_PUSH_TOKEN
  --endpoint <url>  接口地址，默认 https://data.zz.baidu.com/urls
  --urls <file>     推送手工维护的 URL 清单（每行一个），跳过 sitemap
  --all             忽略 state，全量重推
  --state <file>    推送历史文件（默认 scripts/data/baidu-push-state.json）
  --limit <n>       单批 URL 数（默认 2000，百度上限）
  --delay <ms>      批次间隔（默认 500）
  --prune           顺手清除 state 里已不在 sitemap 的 URL 记录
  --dry-run         只打印将推送的 URL，不发起请求
  --verbose         打印每条 URL
  --help            本帮助

示例：
  node scripts/baidu-push.mjs --dry-run
  node scripts/baidu-push.mjs --chunk parts --chunk catalog
  BAIDU_PUSH_TOKEN=xxx node scripts/baidu-push.mjs --all
`;

// ── sitemap 读取 ────────────────────────────────────────────────────────

/** XML 实体解码（sitemap 里的 URL 理论上不应含实体，兜底）。 */
function decodeXmlEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

/** 提取全部 <loc>（索引文件与 URL 集文件通用）。 */
function parseLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => decodeXmlEntities(m[1]));
}

/** 从 sitemap-index.xml 读子 sitemap 清单，附带本地路径与板块名。 */
function readSitemapIndex(distDir) {
  const indexPath = resolve(distDir, 'sitemap-index.xml');
  if (!existsSync(indexPath)) {
    console.error(
      `! 找不到 ${indexPath}。\n` +
        `  先跑一次构建（npm run build:edgeone），sitemap 板块拆分在构建期完成。`
    );
    process.exit(1);
  }
  const children = [];
  for (const url of parseLocs(readFileSync(indexPath, 'utf8'))) {
    const file = basename(new URL(url).pathname);
    const match = file.match(/^sitemap-(.+?)-\d+\.xml$/);
    children.push({ url, file, local: resolve(distDir, file), chunk: match ? match[1] : file });
  }
  return children;
}

/** 读一个子 sitemap 的 URL 清单。 */
function readSitemapUrls(sitemap) {
  if (!existsSync(sitemap.local)) {
    console.error(`! 索引引用了 ${sitemap.file}，但 dist 里没有这个文件（构建被中断过？）。`);
    process.exit(1);
  }
  return parseLocs(readFileSync(sitemap.local, 'utf8'));
}

// ── state（推送历史） ───────────────────────────────────────────────────

function loadState(statePath) {
  if (!existsSync(statePath)) return { site: null, updatedAt: null, pushed: {} };
  try {
    const parsed = JSON.parse(readFileSync(statePath, 'utf8'));
    return { site: parsed.site ?? null, updatedAt: parsed.updatedAt ?? null, pushed: parsed.pushed ?? {} };
  } catch (err) {
    console.error(`! state 文件 ${statePath} 解析失败：${err.message}\n  修复或删除后重跑（--state 可指定别的文件）。`);
    process.exit(1);
  }
}

function saveState(statePath, state) {
  mkdirSync(dirname(resolve(root, statePath)), { recursive: true });
  const target = resolve(root, statePath);
  const tmp = `${target}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(state, null, 2)}\n`);
  renameSync(tmp, target);
}

// ── 百度接口 ────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * 推送一批 URL。返回 { ok, status, body, fatal, message }。
 * fatal=true 表示剩余批次没必要再试（token/配额/站点问题）。
 */
async function pushBatch(endpoint, site, token, urls, timeoutMs = 30000) {
  const url = `${endpoint}?site=${encodeURIComponent(site)}&token=${encodeURIComponent(token)}`;
  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain; charset=UTF-8' },
      body: urls.join('\n'), // 每行一条；无 BOM、无尾随换行（避免空行）
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (err) {
    return {
      ok: false,
      fatal: true,
      message: `网络请求失败：${err.cause?.code || err.message}。` +
        `本机若走代理，Node 的 fetch 不读 HTTP_PROXY 环境变量，需改用直连或换用支持代理的客户端。`,
    };
  }
  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  if (res.ok && body && typeof body.success === 'number') {
    return { ok: true, status: res.status, body };
  }
  const errorCode = body?.error ?? res.status;
  const message = body?.message ?? `HTTP ${res.status}`;
  const hint =
    ERROR_HINTS[errorCode]?.[message] ||
    ERROR_HINTS[errorCode] ||
    `未收录的错误码 ${errorCode}（${message}），按百度文档排查或稍后重试。`;
  return {
    ok: false,
    status: res.status,
    body,
    // 401/配额/站点问题重试无意义；500 和未知码由调用方决定重试
    fatal: errorCode === 401 || message === 'over quota' || message === 'site error',
    message: hint,
  };
}

// ── 主流程 ──────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(HELP);
    return;
  }
  if (!Number.isFinite(opts.limit) || opts.limit < 1) {
    console.error(`! --limit 必须是正整数，当前：${opts.limit}`);
    process.exit(1);
  }
  if (opts.limit > BAIDU_BATCH_LIMIT) {
    console.warn(`! --limit ${opts.limit} 超过百度单次上限，已调回 ${BAIDU_BATCH_LIMIT}。`);
    opts.limit = BAIDU_BATCH_LIMIT;
  }

  // 1. 收集 URL（--urls 手工清单优先，否则从 sitemap 读）
  let site = opts.site;
  let siteDerived = false;
  const byChunk = new Map(); // chunk -> Set<url>（本次要推送的板块）
  const allChunks = new Map(); // chunk -> Set<url>（sitemap 全量，用于 stale/prune 计算）
  if (opts.urls) {
    const listPath = resolve(root, opts.urls);
    if (!existsSync(listPath)) {
      console.error(`! URL 清单不存在：${listPath}`);
      process.exit(1);
    }
    const urls = readFileSync(listPath, 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'));
    if (!urls.length) {
      console.error(`! URL 清单 ${listPath} 里没有有效行。`);
      process.exit(1);
    }
    byChunk.set('manual', new Set(urls));
    site = site || new URL(urls[0]).origin;
    siteDerived = !opts.site;
  } else {
    const distDir = resolve(root, opts.dist);
    const children = readSitemapIndex(distDir);
    for (const child of children) {
      const urls = readSitemapUrls(child);
      const bucket = allChunks.get(child.chunk) ?? new Set();
      for (const u of urls) bucket.add(u);
      allChunks.set(child.chunk, bucket);
    }
    const selected = opts.chunks.length ? children.filter((c) => opts.chunks.includes(c.chunk)) : children;
    if (opts.chunks.length && !selected.length) {
      const known = [...allChunks.keys()].join(', ');
      console.error(`! --chunk ${opts.chunks.join(', ')} 没有匹配任何 sitemap 文件。当前板块：${known}`);
      process.exit(1);
    }
    for (const child of selected) {
      byChunk.set(child.chunk, allChunks.get(child.chunk));
    }
    if (!site) {
      const first = [...allChunks.values()][0]?.values().next().value;
      if (first) {
        site = new URL(first).origin;
        siteDerived = true;
      }
    }
  }

  if (!site) {
    console.error('! 无法确定站点地址：用 --site 显式指定（须与站长平台验证站点完全一致）。');
    process.exit(1);
  }

  const urlSet = new Set([...byChunk.values()].flatMap((s) => [...s]));
  const statePath = resolve(root, opts.state);
  const state = loadState(statePath);
  if (siteDerived) {
    console.log(
      `· 站点参数由 sitemap 推导为 ${site}。若站长平台验证的是 www 子域或不同协议，` +
        `请加 --site 显式指定（必须完全一致，否则报 site error）。`
    );
  }
  if (state.site && state.site !== site) {
    console.log(`· state 记录的站点是 ${state.site}，本次为 ${site}；历史推送记录仍按 URL 全等比对。`);
  }

  // 2. 增量判定（stale 以 sitemap 全量为基准；--urls 模式不判定下线）
  const known = state.pushed;
  const fresh = [...urlSet].filter((u) => !known[u]).sort();
  const fullUrlSet = opts.urls ? null : new Set([...allChunks.values()].flatMap((s) => [...s]));
  const stale = fullUrlSet
    ? Object.keys(known)
        .filter((u) => !fullUrlSet.has(u))
        .sort()
    : [];
  const toPush = opts.all ? [...urlSet].sort() : fresh;

  // 3. 报告
  console.log(`\n板块统计（共 ${byChunk.size} 个板块、${urlSet.size} 条 URL）`);
  for (const [chunk, urls] of byChunk) {
    const newCount = [...urls].filter((u) => !known[u]).length;
    console.log(`  ${chunk.padEnd(10)} ${String(urls.size).padStart(5)} 条，其中新增 ${newCount} 条`);
  }
  if (stale.length) {
    console.log(
      `· ${stale.length} 条已推送过的 URL 不在本次 sitemap 中（已下线/改版/noindex），` +
        `保留在 state 里；加 --prune 可清除。`
    );
  }
  if (opts.all && toPush.length) {
    console.log(`· --all 模式：忽略 state，重推全部 ${toPush.length} 条。`);
  }
  if (!toPush.length) {
    console.log('\n没有需要推送的新 URL。');
    if (opts.prune && stale.length) {
      for (const u of stale) delete known[u];
      state.site = site;
      state.updatedAt = new Date().toISOString();
      saveState(statePath, state);
      console.log(`已从 state 清除 ${stale.length} 条下线 URL。`);
    }
    return;
  }

  const preview = toPush.slice(0, 10).map((u) => `    ${u}`);
  if (toPush.length > 10) preview.push(`    …… 其余 ${toPush.length - 10} 条（--verbose 看全量）`);
  console.log(`\n待推送 ${toPush.length} 条：\n${preview.join('\n')}`);
  if (opts.verbose) {
    for (const u of toPush.slice(10)) console.log(`    ${u}`);
  }

  if (opts.dryRun) {
    console.log('\n[dry-run] 未发起请求。去掉 --dry-run 并确保 BAIDU_PUSH_TOKEN 已设置后正式推送。');
    return;
  }
  if (!opts.token) {
    console.error(
      '\n! 没有推送 token。到百度搜索资源平台「数据提交 → 普通收录 → API 提交」生成，然后：\n' +
        '    Git Bash:  export BAIDU_PUSH_TOKEN=xxxx\n' +
        '    Windows :  setx BAIDU_PUSH_TOKEN xxxx   （新开终端后生效）'
    );
    process.exit(1);
  }

  // 4. 分批推送
  const batches = [];
  for (let i = 0; i < toPush.length; i += opts.limit) batches.push(toPush.slice(i, i + opts.limit));
  console.log(`\n开始推送：${batches.length} 批，每批最多 ${opts.limit} 条 → ${opts.endpoint}`);

  let pushedCount = 0;
  let failed = false;
  let lastRemain = null;
  for (let i = 0; i < batches.length; i++) {
    if (i > 0) await sleep(opts.delay);
    let result = await pushBatch(opts.endpoint, site, opts.token, batches[i]);
    // 500 是百度侧抖动，重试一次再判失败
    if (!result.ok && result.status === 500) {
      await sleep(2000);
      result = await pushBatch(opts.endpoint, site, opts.token, batches[i]);
    }
    const batch = batches[i];
    if (result.ok) {
      const skipped = new Set([...(result.body.not_same_site ?? []), ...(result.body.not_valid ?? [])]);
      const accepted = batch.filter((u) => !skipped.has(u));
      pushedCount += result.body.success;
      lastRemain = result.body.remain;
      const now = new Date().toISOString();
      for (const u of accepted) known[u] = now;
      console.log(
        `  批次 ${i + 1}/${batches.length}：success=${result.body.success}，今日剩余配额 ${result.body.remain}`
      );
      if (result.body.not_same_site?.length) {
        console.log(
          `    ! ${result.body.not_same_site.length} 条 URL 被判为「不是本站」——` +
            `几乎一定是 site 参数与验证站点不一致，检查协议和 www。示例：${result.body.not_same_site[0]}`
        );
      }
      if (result.body.not_valid?.length) {
        console.log(`    ! ${result.body.not_valid.length} 条 URL 不合法，示例：${result.body.not_valid[0]}`);
      }
    } else {
      failed = true;
      console.error(`  批次 ${i + 1}/${batches.length} 失败（HTTP ${result.status ?? '—'}）：${result.message}`);
      if (result.fatal) {
        console.error('  该错误重试无意义，终止剩余批次。');
        break;
      }
    }
  }

  // 5. 落盘 state（只记成功接收的 URL）
  if (pushedCount > 0) {
    if (opts.prune) for (const u of stale) delete known[u];
    state.site = site;
    state.updatedAt = new Date().toISOString();
    saveState(statePath, state);
    console.log(`\n完成：本次推送 ${pushedCount} 条，历史累计 ${Object.keys(known).length} 条。`);
    console.log(`state 已更新：${statePath}`);
  } else if (!failed) {
    console.log('\n没有 URL 被百度接收（可能全部不在本站或已推送过）。');
  }
  if (lastRemain !== null) console.log(`今日剩余配额：${lastRemain}`);
  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(`\n! 未预期的错误：${err.stack || err.message}`);
  process.exit(1);
});
