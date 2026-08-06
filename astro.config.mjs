import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { normalizePublicSiteUrl } from './src/lib/public-site-url';

const site = normalizePublicSiteUrl(process.env.PUBLIC_SITE_URL);

export default defineConfig({
  output: 'static',
  site,
  integrations: site
    ? [
        sitemap({
          filter: (page) =>
            !page.endsWith('/design-system/') &&
            !page.endsWith('/404.html') &&
            !page.endsWith('/404/'),
        }),
      ]
    : [],
});
