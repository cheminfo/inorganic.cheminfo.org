import { expect, test } from 'vitest';

import {
  gradeName,
  normalizeName,
  spellingVariants,
  stockNumeral,
} from '../naming.ts';

const IRON = ['Iron(III) oxide'];

test('case, a space before a parenthesis and extra spaces do not matter', () => {
  for (const typed of [
    'iron(III) oxide',
    'IRON(III) OXIDE',
    'Iron (III) oxide',
    '  iron(III)   oxide ',
  ]) {
    expect({ typed, verdict: gradeName(typed, IRON) }).toStrictEqual({
      typed,
      verdict: { correct: true },
    });
  }
});

test('every accepted name, in either spelling, passes', () => {
  expect(
    gradeName('nitric oxide', ['Nitrogen monoxide', 'Nitric oxide']),
  ).toStrictEqual({ correct: true });
  expect(gradeName('Aluminium oxide', ['Aluminum oxide'])).toStrictEqual({
    correct: true,
  });
  expect(gradeName('Caesium hydroxide', ['Cesium hydroxide'])).toStrictEqual({
    correct: true,
  });
  expect(gradeName('sulphuric acid', ['Sulfuric acid'])).toStrictEqual({
    correct: true,
  });
});

test('the tip ladder names what is off', () => {
  const tips = [
    '',
    'iron III oxide',
    'iron oxide',
    'iron(II) oxide',
    'oxide iron(III)',
    'iron(III) oxyde',
    'rust',
  ].map((typed) => {
    const verdict = gradeName(typed, IRON);
    return verdict.correct ? 'correct' : verdict.tip;
  });
  expect(tips).toStrictEqual([
    'empty',
    'spacing',
    'stock-missing',
    'stock-wrong',
    'order',
    'one-letter',
    'none',
  ]);
});

test('a name is normalised, and spelled both ways', () => {
  expect(normalizeName('  Iron  (III) , oxide ')).toBe('iron(iii),oxide');
  expect(spellingVariants('aluminum sulfate').toSorted()).toStrictEqual([
    'aluminium sulfate',
    'aluminium sulphate',
    'aluminum sulfate',
    'aluminum sulphate',
  ]);
});

test('the Roman numeral of a Stock name is read out', () => {
  expect(stockNumeral('Iron(III) oxide')).toStrictEqual({
    element: 'Iron',
    numeral: 'III',
  });
  expect(stockNumeral('Manganese(II,III) oxide')).toStrictEqual({
    element: 'Manganese',
    numeral: 'II,III',
  });
  expect(stockNumeral('Sodium oxide')).toBeNull();
});
