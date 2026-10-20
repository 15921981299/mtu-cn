/**
 * sitemap 板块拆分配置 —— @astrojs/sitemap 的 `chunks` 选项。
 *
 * 为什么要拆：999 条 URL 挤在一个 sitemap-0.xml 里，百度站长平台上只能看到
 * 一条提交记录，无法回答「零件页收录了没有/目录页收录了没有」。按板块拆成
 * 6 个文件后，每块在站长平台是独立一行，收录进度一眼可查，scripts/baidu-push.mjs
 * 也能按块增量推送。
 *
 * 机制（@astrojs/sitemap >= 3.6）：每个 chunk 回调都会收到全部 URL，返回
 * item 表示归入该块；**所有块都不收的 URL 自动落入隐式的 `pages` 块**。
 * 因此：
 *   1. 各块判定必须互斥（parts 与 catalog 同前缀，靠排除 catalog 区分）；
 *   2. 隐式 pages 块兜底，新增顶层目录忘记归类时会安静地落在 pages 里——
 *      不会丢页，但会让监控粒度变粗。加新板块时回来补一条规则。
 *
 * 输出：dist/sitemap-parts-0.xml / -catalog-0.xml / -products-0.xml /
 * -models-0.xml / -content-0.xml / -pages-0.xml，索引 dist/sitemap-index.xml
 * 自动汇总（robots.txt 已指向它，无需改动）。
 *
 * 注意 astro.config.mjs 的 filter（isSitemapExcluded）先于 chunks 执行，
 * noindex 页根本不会到这里。
 */

/** chunks 回调的入参（@astrojs/sitemap 的 SitemapItem；本站只用 url 判定）。 */
type ChunkItem = { url: string };

/** 板块规则：返回 item 归入本块，返回 undefined 不归入。 */
export type SitemapChunkRule = (item: ChunkItem) => ChunkItem | undefined;

/**
 * 取 pathname 判定，不受协议/域名变化影响。站点无 base path，
 * 且 trailingSlash: 'always'，所有 URL 均以 / 结尾。
 */
function pathOf(item: ChunkItem): string {
  try {
    return new URL(item.url).pathname;
  } catch {
    return item.url;
  }
}

function inPrefixes(pathname: string, prefixes: readonly string[]): boolean {
  return prefixes.some((prefix) => pathname.startsWith(prefix));
}

/**
 * 板块定义。键名 = 输出文件名中的块名（sitemap-<键名>-0.xml），
 * 也是 baidu-push.mjs --chunk 的参数值。
 */
export const sitemapChunks: Record<string, SitemapChunkRule> = {
  /**
   * 零件号详情页（约 810 条）——全站主战场：零件号搜索意图最强、
   * 页面结构最完整，收录监控第一优先。
   * 与 catalog 同属 /part-products/ 前缀，必须排除 catalog 子路径；
   * /part/（imported pages）不以 /part-products/ 开头，天然不会误入。
   */
  parts: (item) => {
    const p = pathOf(item);
    return p.startsWith('/part-products/') && !p.startsWith('/part-products/catalog/') ? item : undefined;
  },

  /** 零件分类目录页（/part-products/catalog/[slug]/）。 */
  catalog: (item) => (pathOf(item).startsWith('/part-products/catalog/') ? item : undefined),

  /** 产品线页（/products/...，含 mtu-spare-parts 等子页）。 */
  products: (item) => (pathOf(item).startsWith('/products/') ? item : undefined),

  /**
   * 机型页：engine-models + series。二者都是可索引的机型聚合页。
   * /series-4000-r03/ 等 imported 页不以 /series/ 开头（第八个字符是 - 不是 /），
   * 不会误入本块。
   */
  models: (item) => {
    const p = pathOf(item);
    return p.startsWith('/engine-models/') || p.startsWith('/series/') ? item : undefined;
  },

  /** 内容营销块：指南 / 应用 / 能力 / 行业 / 动态。 */
  content: (item) =>
    inPrefixes(pathOf(item), ['/guides/', '/applications/', '/capabilities/', '/industries/', '/news/']) ? item : undefined,

  // 首页、关于、联系、隐私、条款、certifications、cross-reference、
  // part-number-index、sitemap、llm-instructions、case-studies、
  // imported pages（/part/...、/stock/ 等根级 slug）——
  // 全部落入 @astrojs/sitemap 隐式的 pages 块，无需在此定义。
};

/** 块名清单（供脚本与文档引用；pages 为隐式块，同样列出）。 */
export const sitemapChunkNames = [...Object.keys(sitemapChunks), 'pages'] as const;
