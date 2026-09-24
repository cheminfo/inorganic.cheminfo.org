import { expect, test } from 'vitest';

import { COMPOUNDS } from '../compounds.ts';
import { NAMES_EN } from '../locales/en.ts';
import { NAMES_FR } from '../locales/fr.ts';

test('every compound is named in English and in French', () => {
  const formulas = COMPOUNDS.map((compound) => compound.formula);
  expect(Object.keys(NAMES_EN)).toStrictEqual(formulas);
  expect(Object.keys(NAMES_FR)).toStrictEqual(formulas);
  for (const formula of formulas) {
    expect({ formula, fr: (NAMES_FR[formula] ?? []).length > 0 }).toStrictEqual(
      { formula, fr: true },
    );
  }
});
