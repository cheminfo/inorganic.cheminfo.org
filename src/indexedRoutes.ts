/**
 * Every address the build writes a page for: the pages of the site, then one
 * per tutorial step, so a teacher can hand out a single step and a search
 * engine indexes each under its own title.
 */

import type { RouteMeta } from 'react-cheminfo/core';

import { TUTORIAL_EN } from './data/locales/tutorial.en.ts';
import { TUTORIAL_STEPS } from './data/tutorial.ts';
import { ROUTES } from './routes.ts';

/** The pages, then the tutorial steps. */
export const INDEXED_ROUTES: readonly RouteMeta[] = [
  ...ROUTES,
  ...TUTORIAL_STEPS.map((step) => {
    const text = TUTORIAL_EN[step.id];
    return {
      path: `/tutorial/${step.id}`,
      title: `${text?.title ?? step.id} — nomenclature`,
      description: text?.metaDescription ?? '',
    };
  }),
];
