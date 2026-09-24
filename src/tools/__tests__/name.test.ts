import { expect, test } from 'vitest';

import { COMPOUNDS } from '../../data/compounds.ts';
import { NAME_TOOL } from '../name.ts';

function compound(formula: string) {
  const found = COMPOUNDS.find((entry) => entry.formula === formula);
  if (found === undefined) throw new Error(`${formula} is not in the pool`);
  return found;
}

test('a right name passes and is restated', () => {
  expect(
    NAME_TOOL.grade(compound('Fe2O3'), { name: 'iron(III) oxide' }).cases,
  ).toStrictEqual([
    {
      label: 'Name',
      passed: true,
      reason: 'Right: Fe₂O₃ is iron(III) oxide.',
      actual: 'iron(III) oxide',
    },
  ]);
});

test('a wrong name says what is off', () => {
  const reasons = ['iron oxide', 'iron(II) oxide', 'rust', ''].map(
    (name) => NAME_TOOL.grade(compound('Fe2O3'), { name }).cases[0]?.reason,
  );
  expect(reasons).toStrictEqual([
    'Iron takes more than one charge: say which with a Roman numeral in parentheses, right after the metal.',
    'The Roman numeral is wrong: work out the charge of the metal from the formula.',
    'That is not a name of Fe₂O₃.',
    'Type a name.',
  ]);
});

test('the hints go from the rule of the class to how the name starts', () => {
  expect(NAME_TOOL.hints(compound('Fe2O3')).slice(1)).toStrictEqual([
    'The oxygens call for a metal charge of +3: write it as a Roman numeral after the metal.',
    'The name starts with “Iron(III)”.',
  ]);
  expect(NAME_TOOL.hints(compound('N2O3'))[1]).toBe(
    'Count the atoms: 2 N and 3 O. A single atom of the first element takes no prefix.',
  );
  expect(NAME_TOOL.hints(compound('HCl'))[1]).toBe(
    'It holds no oxygen: a binary acid, hydro- + the element + -ic acid.',
  );
});

test('the solution gives every accepted name', () => {
  expect(NAME_TOOL.solution(compound('NO'))).toBe(
    '**Nitrogen monoxide**. Also accepted: Nitric oxide.',
  );
});

test('every compound has three hints and a solution', () => {
  for (const entry of COMPOUNDS) {
    expect(NAME_TOOL.hints(entry)).toHaveLength(3);
    expect(NAME_TOOL.solution(entry).startsWith('**')).toBe(true);
  }
});
