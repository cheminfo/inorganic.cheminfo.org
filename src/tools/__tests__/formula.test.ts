import { expect, test } from 'vitest';

import { COMPOUNDS } from '../../data/compounds.ts';
import { FORMULA_TOOL } from '../formula.ts';

function compound(formula: string) {
  const found = COMPOUNDS.find((entry) => entry.formula === formula);
  if (found === undefined) throw new Error(`${formula} is not in the pool`);
  return found;
}

test('any spelling of the right formula passes', () => {
  for (const typed of ['NaOH', 'HONa', 'NaHO']) {
    expect(
      FORMULA_TOOL.grade(compound('NaOH'), { formula: typed }).passed,
    ).toBe(true);
  }
  expect(
    FORMULA_TOOL.grade(compound('FeO(OH)'), { formula: 'FeOOH' }).passed,
  ).toBe(true);
});

test('a wrong formula says what is off', () => {
  const reasons = ['FeO', 'Fe2O3(2-)', 'Cu2O', 'Qq', ''].map(
    (formula) =>
      FORMULA_TOOL.grade(compound('Fe2O3'), { formula }).cases[0]?.reason,
  );
  expect(reasons).toStrictEqual([
    'The elements are right; check how many atoms of each.',
    'A compound is neutral: its formula carries no charge.',
    'Not the formula of iron(III) oxide: check which elements its name names.',
    '“Qq” is not a formula.',
    'Type a formula.',
  ]);
});

test('the hints end on the atom counts, the solution on the formula', () => {
  expect(FORMULA_TOOL.hints(compound('Cu(OH)2')).slice(1)).toStrictEqual([
    'It holds copper, oxygen and hydrogen.',
    'Atoms: Cu 1, O 2, H 2.',
  ]);
  expect(FORMULA_TOOL.solution(compound('Fe2O3'))).toBe('**Fe₂O₃**');
});
