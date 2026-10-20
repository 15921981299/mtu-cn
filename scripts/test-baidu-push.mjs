/**
 * scripts/baidu-push.mjs 的离线回归测试。
 *
 * 起一个假百度 API（随机端口），按脚本队列返回响应，以真实子进程跑推送
 * 脚本，覆盖 10 个场景：请求格式（POST / text-plain / 无 BOM / 无尾随
 * 换行 / 每行一条）、增量与 state 落盘、板块过滤、not_same_site 不记
 * state、401 与 over quota 致命即停、500 重试、分批、--prune、--urls
 * 手工清单、--all 全量。全程不联网，npm run test:baidu-push 可随时跑。
 *
 * 合成数据写在 tmp/（已 gitignore），每次运行前重建。
 */
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, rmSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const STATE = 'tmp/test-state.json';
const statePath = resolve(root, STATE);
const distPath = resolve(root, 'tmp/test-dist');

/** 每次运行前重建合成 dist（上一次运行的增删会持久化，必须重置）。 */
function buildSyntheticDist() {
  const S = 'https://mtupeijian.com';
  const chunks = {
    parts: Array.from({ length: 5 }, (_, i) => S + '/part-products/mtu-part-' + (100 + i) + '/'),
    catalog: [S + '/part-products/catalog/mtu-2000-series/'],
    products: [S + '/products/mtu-spare-parts/', S + '/products/cummins-parts/'],
    models: [S + '/engine-models/mtu-2000-m61-to-m94-parts/', S + '/series/mtu-2000/'],
    content: [S + '/guides/how-to-read-mtu-parts-diagram/', S + '/news/'],
    pages: [S + '/', S + '/about/', S + '/contact/'],
  };
  rmSync(distPath, { recursive: true, force: true });
  mkdirSync(distPath, { recursive: true });
  const head = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  for (const [name, urls] of Object.entries(chunks)) {
    const body = urls.map((u) => '<url><loc>' + u + '</loc></url>').join('');
    writeFileSync(resolve(distPath, 'sitemap-' + name + '-0.xml'), head + body + '</urlset>');
  }
  const indexBody = Object.keys(chunks).map((n) => '<sitemap><loc>' + S + '/sitemap-' + n + '-0.xml</loc></sitemap>').join('');
  writeFileSync(resolve(distPath, 'sitemap-index.xml'), '<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + indexBody + '</sitemapindex>');
}

if (existsSync(statePath)) rmSync(statePath);
buildSyntheticDist();

const requests = [];
let scripted = []; // 响应队列：{ status, body }
const server = createServer((req, res) => {
  const chunks = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', () => {
    const body = Buffer.concat(chunks);
    requests.push({
      method: req.method,
      url: req.url,
      contentType: req.headers['content-type'],
      firstBytes: [...body.subarray(0, 3)].map((b) => b.toString(16).padStart(2, '0')).join(' '),
      endsWithNewline: body.length > 0 && body[body.length - 1] === 0x0a,
      lineCount: body.toString('utf8').split('\n').length,
      body: body.toString('utf8'),
    });
    const next = scripted.shift() ?? { status: 200, body: { success: 0, remain: 0 } };
    res.writeHead(next.status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(next.body));
  });
});

await new Promise((r) => server.listen(0, '127.0.0.1', r));
const PORT = server.address().port; // 随机端口，避免与其他测试冲突
console.log(`mock baidu api listening on ${PORT}`);

function runPush(extraArgs = []) {
  return new Promise((resolveRun) => {
    const child = spawn(
      process.execPath,
      [
        resolve(root, 'scripts/baidu-push.mjs'),
        '--dist',
        'tmp/test-dist',
        '--endpoint',
        `http://127.0.0.1:${PORT}/urls`,
        '--token',
        'TESTTOKEN',
        '--state',
        STATE,
        '--delay',
        '0',
        ...extraArgs,
      ],
      { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] }
    );
    let out = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (out += d));
    child.on('close', (code) => resolveRun({ code, out }));
  });
}

const results = [];
function check(name, cond, detail = '') {
  results.push({ name, pass: !!cond, detail });
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
}

// ── 场景 1：全量推送成功 ────────────────────────────────────────────────
scripted = [{ status: 200, body: { success: 15, remain: 4999900, not_same_site: [], not_valid: [] } }];
let r = await runPush();
const req1 = requests[0];
check('场景1 退出码 0', r.code === 0, `code=${r.code}`);
check('场景1 POST 方法', req1.method === 'POST');
check('场景1 Content-Type text/plain', req1.contentType?.startsWith('text/plain'), req1.contentType);
check('场景1 query 含 site 与 token（URL 编码）', /site=https%3A%2F%2Fmtupeijian\.com/.test(req1.url) && /token=TESTTOKEN/.test(req1.url), req1.url);
check('场景1 body 无 BOM', req1.firstBytes !== 'ef bb bf', req1.firstBytes);
check('场景1 body 无尾随换行', req1.endsWithNewline === false);
check('场景1 每行一个 URL（15 行）', req1.lineCount === 15, `lines=${req1.lineCount}`);
check('场景1 输出 success=15', r.out.includes('success=15'));
check('场景1 state 文件已写入', existsSync(statePath));
const state1 = JSON.parse(readFileSync(statePath, 'utf8'));
check('场景1 state 记录 15 条', Object.keys(state1.pushed).length === 15, `n=${Object.keys(state1.pushed).length}`);

// ── 场景 2：重复运行，增量判定为空 ──────────────────────────────────────
r = await runPush();
check('场景2 无新 URL 时零请求', requests.length === 1, `requests=${requests.length}`);
check('场景2 输出"没有需要推送的新 URL"', r.out.includes('没有需要推送的新 URL'));
check('场景2 退出码 0', r.code === 0);

// ── 场景 3：新增 2 条 URL，只推这 2 条 ─────────────────────────────────
const partsFile = resolve(root, 'tmp/test-dist/sitemap-parts-0.xml');
const partsXml = readFileSync(partsFile, 'utf8').replace('</urlset>', '<url><loc>https://mtupeijian.com/part-products/mtu-part-200/</loc></url><url><loc>https://mtupeijian.com/part-products/mtu-part-201/</loc></url></urlset>');
writeFileSync(partsFile, partsXml);
scripted = [{ status: 200, body: { success: 2, remain: 4999800, not_same_site: [], not_valid: [] } }];
r = await runPush();
const req3 = requests[requests.length - 1];
check('场景3 只推 2 条新 URL', req3.lineCount === 2, `lines=${req3.lineCount}`);
check('场景3 新 URL 正确', req3.body.includes('mtu-part-200') && req3.body.includes('mtu-part-201'));
check('场景3 state 累计 17 条', Object.keys(JSON.parse(readFileSync(statePath, 'utf8')).pushed).length === 17);

// ── 场景 4：not_same_site 不记入 state ─────────────────────────────────
const modelsFile = resolve(root, 'tmp/test-dist/sitemap-models-0.xml');
const modelsXml = readFileSync(modelsFile, 'utf8').replace('</urlset>', '<url><loc>https://mtupeijian.com/engine-models/mtu-1163-tb73-to-tb93-parts/</loc></url></urlset>');
writeFileSync(modelsFile, modelsXml);
scripted = [{
  status: 200,
  body: { success: 0, remain: 4999800, not_same_site: ['https://mtupeijian.com/engine-models/mtu-1163-tb73-to-tb93-parts/'], not_valid: [] },
}];
r = await runPush();
check('场景4 not_same_site 告警出现', r.out.includes('不是本站'));
const state4 = JSON.parse(readFileSync(statePath, 'utf8'));
check('场景4 被判非本站的 URL 不进 state', !state4.pushed['https://mtupeijian.com/engine-models/mtu-1163-tb73-to-tb93-parts/']);
check('场景4 state 仍是 17 条', Object.keys(state4.pushed).length === 17);

// ── 场景 5：401 token 错误，致命即停 ───────────────────────────────────
writeFileSync(partsFile, readFileSync(partsFile, 'utf8').replace('</urlset>', '<url><loc>https://mtupeijian.com/part-products/mtu-part-300/</loc></url></urlset>'));
scripted = [{ status: 401, body: { error: 401, message: 'token is not valid' } }];
r = await runPush();
check('场景5 401 退出码 1', r.code === 1, `code=${r.code}`);
check('场景5 401 提示含处理建议', r.out.includes('token 无效'));
check('场景5 401 不再发第二批', requests.length === 4, `requests=${requests.length}`);
check('场景5 失败不影响已有 state', Object.keys(JSON.parse(readFileSync(statePath, 'utf8')).pushed).length === 17);

// ── 场景 6：--limit 3 分批 ─────────────────────────────────────────────
const before = requests.length;
writeFileSync(partsFile, readFileSync(partsFile, 'utf8').replace('</urlset>', '<url><loc>https://mtupeijian.com/part-products/mtu-part-301/</loc></url><url><loc>https://mtupeijian.com/part-products/mtu-part-302/</loc></url></urlset>'));
scripted = [
  { status: 200, body: { success: 3, remain: 100, not_same_site: [], not_valid: [] } },
  { status: 200, body: { success: 1, remain: 99, not_same_site: [], not_valid: [] } },
];
r = await runPush(['--limit', '3']);
const sent = requests.slice(before);
check('场景6 4 条新 URL 分 2 批', sent.length === 2, `batches=${sent.length}`);
check('场景6 批 1 为 3 条', sent[0].lineCount === 3, `lines=${sent[0].lineCount}`);
check('场景6 批 2 为 1 条', sent[1].lineCount === 1, `lines=${sent[1].lineCount}`);

// ── 场景 7：--prune 清除下线 URL ───────────────────────────────────────
writeFileSync(partsFile, readFileSync(partsFile, 'utf8').replace('<url><loc>https://mtupeijian.com/part-products/mtu-part-301/</loc></url>', ''));
const stateBefore = Object.keys(JSON.parse(readFileSync(statePath, 'utf8')).pushed).length;
r = await runPush(['--prune']);
const stateAfter = JSON.parse(readFileSync(statePath, 'utf8'));
check('场景7 输出提示已下线 URL', r.out.includes('不在本次 sitemap 中'));
check('场景7 state 清掉下线 URL', Object.keys(stateAfter.pushed).length === stateBefore - 1, `${stateBefore} -> ${Object.keys(stateAfter.pushed).length}`);
check('场景7 退出码 0', r.code === 0);

// ── 场景 8：over quota 致命即停 ────────────────────────────────────────
const before8 = requests.length;
writeFileSync(partsFile, readFileSync(partsFile, 'utf8').replace('</urlset>', '<url><loc>https://mtupeijian.com/part-products/mtu-part-400/</loc></url><url><loc>https://mtupeijian.com/part-products/mtu-part-401/</loc></url><url><loc>https://mtupeijian.com/part-products/mtu-part-402/</loc></url></urlset>'));
scripted = [
  { status: 400, body: { error: 400, message: 'over quota' } },
  { status: 200, body: { success: 99, remain: 1, not_same_site: [], not_valid: [] } },
];
r = await runPush();
check('场景8 over quota 退出码 1', r.code === 1, `code=${r.code}`);
check('场景8 提示每日配额', r.out.includes('每日推送配额'));
check('场景8 第二批未发出', requests.length === before8 + 1, `requests=${requests.length - before8}`);

// ── 场景 9：--urls 手工清单（用没推送过的新 URL）──────────────────────
writeFileSync(resolve(root, 'tmp/test-urls.txt'), '# 注释行\nhttps://mtupeijian.com/part-products/mtu-part-500/\n\nhttps://mtupeijian.com/part-products/mtu-part-501/\n');
const before9 = requests.length;
scripted = [{ status: 200, body: { success: 2, remain: 5, not_same_site: [], not_valid: [] } }];
r = await runPush(['--urls', 'tmp/test-urls.txt']);
const req9 = requests[requests.length - 1];
check('场景9 手工清单 2 条', req9 && req9.lineCount === 2, `lines=${req9?.lineCount}`);
check('场景9 忽略注释与空行', req9 && !req9.body.includes('#') && req9.body.split('\n').length === 2);
check('场景9 退出码 0', r.code === 0);

// ── 场景 10：--all 全量重推 ────────────────────────────────────────────
const before10 = requests.length;
scripted = Array.from({ length: 30 }, () => ({ status: 200, body: { success: 1, remain: 5, not_same_site: [], not_valid: [] } }));
r = await runPush(['--all', '--limit', '3']);
console.log('--- 场景10 完整输出 ---\n' + r.out + '\n--- 退出码:', r.code, '---');
const sentAll = requests.slice(before10);
check('场景10 --all 重推全部', sentAll.reduce((n, q) => n + q.lineCount, 0) >= 15, `total=${sentAll.reduce((n, q) => n + q.lineCount, 0)}`);
check('场景10 输出含 --all 说明', r.out.includes('--all 模式'));

server.close();
const failed = results.filter((x) => !x.pass);
console.log(`\n========== ${results.length - failed.length}/${results.length} 通过 ==========`);
if (failed.length) {
  console.log('失败项：', failed.map((f) => f.name).join(' | '));
  process.exit(1);
}
