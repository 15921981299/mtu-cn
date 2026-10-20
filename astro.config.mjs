import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { isSitemapExcluded } from './src/data/sitemap-exclude.ts';
import { sitemapChunks } from './src/data/sitemap-chunks.ts';

export default defineConfig({
  // SINGLE SOURCE for canonical, og:image, sitemap <loc> and JSON-LD @id.
  // Must match site.url in src/data/site.ts and the Sitemap line in public/robots.txt.
  site: 'https://mtupeijian.com',
  trailingSlash: 'always',
  vite: {
    optimizeDeps: { entries: ['src/scripts/**/*.ts'] },
  },
  build: {
    // The deploy uploads the whole directory, so HTML that stops being
    // generated (e.g. part pages merged into a canonical slug) would otherwise
    // linger in dist/ and keep serving 200s next to the 301s.
    cleanOutDir: true,
  },
  integrations: [
    sitemap({
      filter: (page) => {
        try {
          const pathname = new URL(page).pathname;
          return !isSitemapExcluded(pathname);
        } catch {
          return true;
        }
      },
      // 按板块拆成 6 个 sitemap 文件（parts/catalog/products/models/content +
      // 隐式 pages），索引 sitemap-index.xml 自动汇总，robots.txt 已指向它。
      // 规则见 src/data/sitemap-chunks.ts；加新顶层目录时记得补块。
      chunks: sitemapChunks,
    }),
  ],
});
