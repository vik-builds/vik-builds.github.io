import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages USER SITE. The repo must be named exactly `vik-builds.github.io`.
// No `base` is set, so root-relative links (`/work/`) work as written.
// To move to a custom domain later: change `site` and add `public/CNAME`. Nothing else changes.
export default defineConfig({
  site: 'https://vik-builds.github.io',
  trailingSlash: 'always',
  // Pin the dev port so the local URL never moves between restarts.
  // `strictPort` makes a port clash fail loudly instead of silently
  // rebinding somewhere else and stranding an open browser tab.
  server: { port: 4321, strictPort: true },
  // Shiki's bundled themes hard-code their palette into an inline style on every
  // <pre> (github-dark shipped `background-color:#24292e;color:#e1e4e8`), which
  // bypasses the design tokens and puts raw hex in the HTML. `css-variables`
  // makes Shiki emit var(--astro-code-*) instead; those are bound to the palette
  // in src/styles/global.css.
  markdown: {
    shikiConfig: { theme: 'css-variables' },
  },
  integrations: [
    sitemap({
      serialize(item) {
        if (item.url.endsWith('/')) item.priority = 0.7;
        return item;
      },
    }),
  ],
});
