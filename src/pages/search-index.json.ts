import type { APIRoute } from 'astro';
import { isPartPageIndexable, mtuCatalogHubs, mtuParts } from '../data/mtu-parts';

/**
 * 站内搜索索引（构建期生成的静态 JSON）
 * - p: 零件页（只收可索引页，与 sitemap/noindex 口径一致）
 * - c: 品类目录页
 * 体积估算：约 843 零件 + 61 品类，gzip 后约 15–20 KB
 */
export const GET: APIRoute = () => {
  const parts = mtuParts
    .filter((part) => isPartPageIndexable(part))
    .map((part) => ({
      t: 'p' as const,
      pn: part.partNumber,
      name: part.name,
      s: part.series.join(' '),
      slug: part.slug,
    }));
  const catalogs = mtuCatalogHubs.map((hub) => ({
    t: 'c' as const,
    pn: '',
    name: hub.h1Title,
    s: '',
    slug: `catalog/${hub.slug}`,
  }));
  return new Response(JSON.stringify([...parts, ...catalogs]), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // 索引全站共用，允许长缓存；内容随部署整体变更
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
