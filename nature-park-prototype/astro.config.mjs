import { defineConfig } from 'astro/config';
import githubPages from '@astrojs/github-pages';

export default defineConfig({
  site: 'https://FreshNewStart.github.io',
  base: '/Port-Moresby-Nature-Park',
  integrations: [githubPages()]
});
