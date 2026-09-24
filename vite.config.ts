import react from '@vitejs/plugin-react';
import { cheminfoBuildInfo, cheminfoPrerender } from 'react-cheminfo/vite';
import { defineConfig } from 'vite';

import { INDEXED_ROUTES } from './src/indexedRoutes.ts';
import { ROUTES, SITE_ID, SITE_URL } from './src/routes.ts';

/**
 * The port this project owns, derived from a date by rules/backend.md: its
 * creation date, 2026-09-18, gives 10918, which atoms.cheminfo.org holds, and
 * moles.cheminfo.org holds 10920, so the next free date, 2026-09-22, gives
 * 6·09·22 = 60922, over 60000, less 50000. Docker publishes it; the Vite dev
 * server takes the next number, claimed strictly.
 */
const port = Number(process.env.PORT ?? 10_922);

export default defineConfig({
  // The build carries no mount path. Every asset is written relative, so the
  // one `dist` serves this site's own host and a path of a shared one without
  // being rebuilt: the `<base>` the page carries is what resolves them.
  base: './',
  plugins: [
    react(),
    cheminfoBuildInfo(),
    // One real HTML file per routed address, each with its own title,
    // description and canonical, plus the sitemap and robots.txt. A static
    // image has nothing to rewrite a head per request.
    cheminfoPrerender({
      site: SITE_ID,
      // The pages and every tutorial step: each is a link a teacher hands out.
      routes: INDEXED_ROUTES,
      origin: SITE_URL,
      description:
        'Name an inorganic compound from its formula and write its formula from its name, with a step-by-step tutorial, graded exercises and the rules on one page.',
      operatingSystem: 'Any modern browser',
      noscript: {
        hrefs: 'relative',
        heading: 'inorganic.cheminfo.org — inorganic nomenclature',
        intro:
          'Name oxides, hydroxides, peroxides, covalent compounds and acids from their formula, and write their formula from their name: a tutorial, graded exercises and the rules on one page. The exercises need JavaScript, because they are checked in your browser.',
        routes: ROUTES,
        ecosystem: { taglines: false },
      },
    }),
  ],
  resolve: {
    // One copy of each, even when a dependency is linked from a checkout: two
    // copies of React make hooks read a dispatcher the renderer never filled.
    dedupe: ['react', 'react-dom', '@blueprintjs/core'],
  },
  server: { port: port + 1, strictPort: true },
  preview: { port: port + 1, strictPort: true },
  build: {
    // The isotope tables of mass-tools and Blueprint's icons fill one chunk.
    chunkSizeWarningLimit: 2048,
  },
});
