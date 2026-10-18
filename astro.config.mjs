import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { isSitemapExcluded } from './src/data/sitemap-exclude.ts';

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
    }),
  ],
});
