import { assertRoutes } from 'react-cheminfo/core';
import { expect, test } from 'vitest';

import { INDEXED_ROUTES } from '../indexedRoutes.ts';
import { ROUTES, routeForTab } from '../routes.ts';

test('the table is one the build can write files from', () => {
  expect(() => {
    assertRoutes(INDEXED_ROUTES);
  }).not.toThrow();
});

test('every page and every step carries a title and a description written for search', () => {
  for (const route of INDEXED_ROUTES) {
    expect({ path: route.path, short: route.title.length <= 60 }).toStrictEqual(
      {
        path: route.path,
        short: true,
      },
    );
    expect({
      path: route.path,
      length:
        route.description.length >= 110 && route.description.length <= 160,
    }).toStrictEqual({ path: route.path, length: true });
  }
});

test('the tool lives at the root, and each step of the tutorial has its address', () => {
  expect(ROUTES.map((route) => [route.tab, route.path])).toStrictEqual([
    ['tutorial', '/tutorial'],
    ['name', '/'],
    ['formula', '/formula'],
    ['rules', '/rules'],
    ['about', '/about'],
  ]);
  expect(
    INDEXED_ROUTES.slice(ROUTES.length).map((route) => route.path),
  ).toStrictEqual([
    '/tutorial/metal-oxides',
    '/tutorial/stock-numbers',
    '/tutorial/hydroxides',
    '/tutorial/peroxides',
    '/tutorial/nonmetal-oxides',
    '/tutorial/covalent',
    '/tutorial/binary-acids',
    '/tutorial/oxoacids',
  ]);
  expect(routeForTab('formula').label).toBe('Write it');
});
