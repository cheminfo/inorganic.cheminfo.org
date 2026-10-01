/**
 * Every address this site answers, each with the name and the sentence it is
 * indexed under.
 *
 * One table, read by four things that must agree on it: the router, which turns
 * an address into a page; the build, which writes one real HTML file per entry
 * plus the sitemap listing them; the `noscript` crawl path; and the running
 * app, which retitles the tab after an in-app move. Pure data, so the vite
 * config can import it.
 */

import type { RouteMeta } from 'react-cheminfo/core';

/** The site, as the header, the prerender and the share dialog name it. */
export const SITE_ID = 'inorganic';

/** What the site is called in prose, spelled as the address it is. */
export const SITE_NAME = 'inorganic.cheminfo.org';

/** Where the site is served, and what every canonical address is built on. */
export const SITE_URL = 'https://inorganic.cheminfo.org';

/** The pages, named as the router and the state name them. */
export type TabId = 'tutorial' | 'name' | 'formula' | 'rules' | 'about';

/** A graded tool, as opposed to the tutorial, the rules and the About. */
export type ToolTab = 'name' | 'formula';

/** A routed page: what a crawler is told about it, and what the bar writes. */
export interface RouteDefinition extends RouteMeta {
  /** The page this address opens. */
  tab: TabId;
  /** How the page is named in the header bar. */
  label: string;
  /**
   * Whether a second path segment names one of the page's items, as
   * `/tutorial/oxoacids` names a step.
   * @default false
   */
  takesId?: boolean;
}

/**
 * The pages, in the order the bar lists them: discovery, practice, reference.
 * The naming exercise lives at the root: it is the tool.
 */
const ROUTE_TABLE = [
  {
    path: '/tutorial',
    tab: 'tutorial',
    label: 'Tutorial',
    takesId: true,
    prefix: true,
    title: 'Inorganic nomenclature, step by step',
    short: 'Tutorial',
    note: 'one class of compounds at a time',
    description:
      'Learn to name oxides, hydroxides, peroxides, covalent compounds and acids one class at a time, each rule shown on real compounds you then name yourself.',
  },
  {
    path: '/',
    tab: 'name',
    label: 'Name it',
    title: 'Name an inorganic compound from its formula',
    short: 'Name it',
    note: 'from the formula to the IUPAC name',
    description:
      'Give the name of an oxide, a hydroxide, an acid or a covalent compound from its formula, and hear exactly what is off: a Roman numeral, a prefix, a letter.',
  },
  {
    path: '/formula',
    tab: 'formula',
    label: 'Write it',
    title: 'Write the formula of an inorganic compound',
    short: 'Write it',
    note: 'from the name to the formula',
    description:
      'Write the formula of an inorganic compound from its name, by balancing the charges of its ions or reading its Greek prefixes, with graded questions.',
  },
  {
    path: '/rules',
    tab: 'rules',
    label: 'Rules',
    title: 'The rules of inorganic nomenclature',
    short: 'Rules',
    note: 'on one printable page',
    description:
      'The rules of inorganic nomenclature on one printable page: metal oxides and Stock numbers, hydroxides, peroxides, Greek prefixes, binary acids and oxoacids.',
  },
  {
    path: '/about',
    tab: 'about',
    label: 'About',
    title: 'About',
    short: 'About',
    note: 'what it is built on, and how to cite it',
    description:
      'What inorganic.cheminfo.org is, who provides it, where its compounds and their names come from, what it is built on, and how to cite it in a course.',
  },
] as const satisfies readonly RouteDefinition[];

/** Every page of the site. */
export const ROUTES: readonly RouteDefinition[] = ROUTE_TABLE;

/** The graded tools. */
export const TOOL_TABS: readonly ToolTab[] = ['name', 'formula'];

/** The page an address the site does not know opens. */
export const HOME_TAB: TabId = 'name';

/**
 * The route of a tab.
 * @param tab - The tab being asked about.
 * @returns Its route, which is the home page for a tab the table does not name.
 */
export function routeForTab(tab: TabId): RouteDefinition {
  let home: RouteDefinition = ROUTE_TABLE[1];
  for (const route of ROUTES) {
    if (route.tab === tab) return route;
    if (route.tab === HOME_TAB) home = route;
  }
  return home;
}
