import { expect, test } from 'vitest';

import { COMPOUNDS } from '../../data/compounds.ts';
import { acceptedNames } from '../../data/names.ts';
import { metalCharge } from '../classes.ts';
import { canonicalFormula } from '../formula.ts';
import { stockNumeral } from '../naming.ts';

function compound(formula: string) {
  const found = COMPOUNDS.find((entry) => entry.formula === formula);
  if (found === undefined) throw new Error(`${formula} is not in the pool`);
  return found;
}

const ROMAN: Record<string, number> = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
};

test('the charge of the metal is read off the formula', () => {
  expect(metalCharge(compound('Fe2O3'))).toBe(3);
  expect(metalCharge(compound('Cu(OH)2'))).toBe(2);
  expect(metalCharge(compound('Na2O2'))).toBe(1);
  expect(metalCharge(compound('Mn3O4'))).toBeNull();
});

test('every Roman numeral of the pool matches the charge the formula gives', () => {
  const mismatched: string[] = [];
  for (const entry of COMPOUNDS) {
    const stock = stockNumeral(acceptedNames(entry.formula)[0] ?? '');
    if (stock === null || stock.numeral.includes(',')) continue;
    if (ROMAN[stock.numeral] !== metalCharge(entry)) {
      mismatched.push(entry.formula);
    }
  }
  expect(mismatched).toStrictEqual([]);
});

test('the pool holds 187 compounds, each once, each named and parsable', () => {
  expect(COMPOUNDS).toHaveLength(187);
  const formulas = COMPOUNDS.map((entry) => entry.formula);
  expect(new Set(formulas).size).toBe(187);
  for (const formula of formulas) {
    expect({ formula, named: acceptedNames(formula).length > 0 }).toStrictEqual(
      { formula, named: true },
    );
    expect(() => canonicalFormula(formula)).not.toThrow();
  }
});

test('the corrected entries say what the compounds are', () => {
  expect(acceptedNames('CCl4')[0]).toBe('Carbon tetrachloride');
  expect(acceptedNames('NO2')[0]).toBe('Nitrogen dioxide');
  expect(acceptedNames('PH3')[0]).toBe('Phosphine');
  expect(acceptedNames('H2N2O2')[0]).toBe('Hyponitrous acid');
  expect(acceptedNames('Cu(OH)2')[0]).toBe('Copper(II) hydroxide');
  expect(COMPOUNDS.some((entry) => entry.formula === 'H2CO')).toBe(false);
});
