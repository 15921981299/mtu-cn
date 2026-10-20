/**
 * EdgeOne 构建收尾：校验重定向同步 + 清理不该对外暴露的内部文件。
 *
 * 背景：`build:edgeone` 刻意不跑 scripts/create-worker-entry.mjs（它会生成
 * dist/_worker.js，被当静态资源公开），因此原来由它负责的两件事必须由本
 * 脚本补上：
 *
 *   1. dist/seo-redirects.json —— 零件页去重映射，源码注释明确要求"绝不能
 *      在生产可访问"。create-worker-entry.mjs 曾用完即删，EdgeOne 构建没跑
 *      它，这个文件就会原样部署上去。
 *   2. dist/_redirects —— EdgeOne 不读这个文件（只认 edgeone.json 的
 *      redirects），留着只是冗余。
 *
 * 另外顺手校验 edgeone.json.redirects 是否与 public/_redirects、
 * dist/seo-redirects.json 保持一致——零件数据变了而规则没同步时给出告警。
 */

import { existsSync, rmSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');

// ── 1. 重定向同步校验 ────────────────────────────────────────────────────
const edgeonePath = resolve(root, 'edgeone.json');
const legacyPath = resolve(dist, 'seo-redirects.json');
const handPath = resolve(root, 'public/_redirects');
const drift = [];

/** @returns {(src: string) => { destination?: string } | undefined} */
function finder(redirects) {
  const map = new Map(redirects.map((r) => [r.source, r.destination]));
  return (src) => (map.has(src) ? { destination: map.get(src) } : undefined);
}

if (existsSync(edgeonePath)) {
  const redirects = JSON.parse(readFileSync(edgeonePath, 'utf8')).redirects ?? [];
  const find = finder(redirects);

  if (existsSync(handPath)) {
    for (const raw of readFileSync(handPath, 'utf8').split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const [source, destination] = line.split(/\s+/);
      if (!source || !destination) continue;
      const hit = find(source);
      if (!hit || hit.destination !== destination) drift.push(source);
    }
  }

  if (existsSync(legacyPath)) {
    const legacy = JSON.parse(readFileSync(legacyPath, 'utf8'));
    for (const [from, to] of Object.entries(legacy)) {
      const source = `/part-products/${from}/`;
      const hit = find(source);
      if (!hit || hit.destination !== `/part-products/${to}/`) drift.push(source);
    }
  }

  if (drift.length) {
    console.warn(
      `\n! edgeone.json 的 redirects 与源数据不一致（${drift.length} 处）。\n` +
        `  请执行：python scripts/tmp-gen-edgeone-redirects.py\n` +
        `  示例差异：${drift.slice(0, 3).join(', ')}\n`,
    );
  } else {
    console.log(`redirects 同步校验通过（${redirects.length} 条）`);
  }
} else {
  console.warn('! edgeone.json 不存在，跳过重定向校验。');
}

// ── 2. 清理内部文件 ──────────────────────────────────────────────────────
for (const name of ['seo-redirects.json', '_redirects']) {
  const target = resolve(dist, name);
  if (existsSync(target)) {
    rmSync(target, { force: true });
    console.log(`已移除 dist/${name}`);
  }
}
