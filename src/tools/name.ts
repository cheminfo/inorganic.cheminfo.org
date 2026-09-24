import { finishValidation } from 'react-cheminfo/core';

import { mainClass, metalCharge } from '../chemistry/classes.ts';
import { atomCounts, formulaText, readFormula } from '../chemistry/formula.ts';
import type { NameTip } from '../chemistry/naming.ts';
import { gradeName, stockNumeral } from '../chemistry/naming.ts';
import type { Compound, CompoundClass } from '../data/compounds.ts';
import { COMPOUNDS } from '../data/compounds.ts';
import { acceptedNames, lowerFirst, shownName } from '../data/names.ts';
import { emptyCase } from '../exercises/cases.ts';
import type { AnswerCheck, Answers, SeriesTool } from '../exercises/types.ts';

const FIELD = 'name';
const LABEL = 'Name';

/** Name a compound from its formula. */
export const NAME_TOOL: SeriesTool<Compound> = {
  id: 'name',
  pool: COMPOUNDS,
  key: (compound) => compound.formula,
  level: (compound) => (compound.level === 'school' ? 'beginner' : 'advanced'),
  fields: () => [
    {
      key: FIELD,
      label: LABEL,
      placeholder: 'e.g. sodium oxide',
      inputMode: 'text',
    },
  ],
  grade: gradeNameAnswer,
  hints: nameHints,
  solution: nameSolution,
};

/**
 * Grade a name, and when it is wrong say how.
 * @param compound - The compound asked about.
 * @param answers - The name typed.
 * @returns One case.
 */
export function gradeNameAnswer(
  compound: Compound,
  answers: Answers,
): AnswerCheck {
  const typed = answers[FIELD] ?? '';
  if (typed.trim() === '') {
    return finishValidation([emptyCase(LABEL, 'a name')]);
  }
  const verdict = gradeName(typed, acceptedNames(compound.formula));
  return finishValidation([
    {
      label: LABEL,
      passed: verdict.correct,
      reason: verdict.correct
        ? `Right: ${formulaText(compound.formula)} is ${lowerFirst(shownName(compound.formula))}.`
        : tipText(verdict.tip, verdict.closest, compound),
      actual: typed,
    },
  ]);
}

/**
 * Hints for naming a compound: the rule of its class, how it applies here,
 * then how the name begins.
 * @param compound - The compound asked about.
 * @returns Three hints.
 */
export function nameHints(compound: Compound): string[] {
  const name = shownName(compound.formula);
  const stock = stockNumeral(name);
  const opening = stock
    ? `${stock.element}(${stock.numeral})`
    : (name.split(' ', 1)[0] ?? name);
  return [
    CLASS_RULES[mainClass(compound)],
    classDetail(compound, stock !== null),
    `The name starts with “${opening}”.`,
  ];
}

/**
 * The name, and every other name accepted.
 * @param compound - The compound asked about.
 * @returns The solution.
 */
export function nameSolution(compound: Compound): string {
  const [shown = '', ...others] = acceptedNames(compound.formula);
  const also =
    others.length === 0 ? '' : ` Also accepted: ${others.join(', ')}.`;
  return `**${shown}**.${also}`;
}

// The classes named after a metal, which may need a Roman numeral.
const METAL_CLASSES: ReadonlySet<CompoundClass> = new Set([
  'metal-oxide',
  'hydroxide',
  'peroxide',
]);

const CLASS_RULES: Readonly<Record<CompoundClass, string>> = {
  'metal-oxide':
    'A metal and oxygen: the name of the metal, then “oxide”. See the [[oxidation number]] rule for a metal with several charges.',
  hydroxide: 'A metal and OH groups: the name of the metal, then “hydroxide”.',
  peroxide:
    'The two oxygens are bonded to each other, O₂²⁻: the name of the metal, then “peroxide”.',
  'nonmetal-oxide':
    'Two non-metals: each is counted with a [[greek prefix]] — mono-, di-, tri-, tetra-, penta- — and the oxygen comes last, as “oxide”.',
  covalent:
    'Two non-metals: the first named as the element, the second with -ide, each counted with a [[greek prefix]].',
  acid: 'An acid: a binary acid is hydro…ic acid; an [[oxoacid]] ends in -ic or -ous, with per- or hypo- at the ends of its family.',
};

function classDetail(compound: Compound, hasNumeral: boolean): string {
  const kind = mainClass(compound);
  const counts = atomCounts(readFormula(compound.formula));
  if (METAL_CLASSES.has(kind)) {
    if (!hasNumeral) {
      return 'This metal takes a single charge here: the name needs no Roman numeral.';
    }
    const charge = metalCharge(compound);
    return charge === null
      ? 'The metal atoms carry different charges: the name gives each, as in (II,III).'
      : `The oxygens call for a metal charge of +${charge}: write it as a Roman numeral after the metal.`;
  }
  if (kind === 'acid') {
    return counts.has('O')
      ? 'It holds oxygen: an oxoacid, whose ending says how much oxygen it holds next to the rest of its family.'
      : 'It holds no oxygen: a binary acid, hydro- + the element + -ic acid.';
  }
  const listed = [...counts]
    .map(([symbol, count]) => `${count} ${symbol}`)
    .join(' and ');
  return `Count the atoms: ${listed}. A single atom of the first element takes no prefix.`;
}

function tipText(tip: NameTip, closest: string, compound: Compound): string {
  return TIP_TEXT[tip](closest, compound);
}

const TIP_TEXT: Readonly<
  Record<NameTip, (closest: string, compound: Compound) => string>
> = {
  empty: () => 'Type a name.',
  spacing: () => 'Nearly: check the spaces, hyphens and parentheses.',
  'stock-missing': (closest) =>
    `${stockNumeral(closest)?.element ?? 'The metal'} takes more than one charge: say which with a Roman numeral in parentheses, right after the metal.`,
  'stock-wrong': () =>
    'The Roman numeral is wrong: work out the charge of the metal from the formula.',
  numbering: () => 'Check the numbers in the name.',
  order: () =>
    'All the letters are there, in the wrong order: have two words, or two letters, swapped?',
  'one-letter': () => 'One letter is wrong, missing or one too many.',
  none: (_closest, compound) =>
    `That is not a name of ${formulaText(compound.formula)}.`,
};
