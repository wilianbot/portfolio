import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const site = process.env.PUBLIC_SITE_URL;

export default defineConfig({
  output: 'static',
  site,
  integrations: site ? [sitemap()] : [],
});
