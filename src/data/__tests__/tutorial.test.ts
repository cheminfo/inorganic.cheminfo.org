import { expect, test } from 'vitest';

import { COMPOUNDS } from '../compounds.ts';
import { TUTORIAL_EN } from '../locales/tutorial.en.ts';
import { TUTORIAL_STEPS } from '../tutorial.ts';

test('every example and practice compound of the tutorial is in the pool', () => {
  const pool = new Set(COMPOUNDS.map((entry) => entry.formula));
  const missing = TUTORIAL_STEPS.flatMap((step) => [
    ...step.examples,
    step.practice,
  ]).filter((formula) => !pool.has(formula));
  expect(missing).toStrictEqual([]);
});

test('every step has its prose, and no prose is left without a step', () => {
  expect(Object.keys(TUTORIAL_EN).toSorted()).toStrictEqual(
    TUTORIAL_STEPS.map((step) => step.id).toSorted(),
  );
});

test('the steps run from the metals to the acids', () => {
  expect(TUTORIAL_STEPS.map((step) => step.level)).toStrictEqual([
    'beginner',
    'beginner',
    'beginner',
    'beginner',
    'intermediate',
    'intermediate',
    'advanced',
    'advanced',
  ]);
});
