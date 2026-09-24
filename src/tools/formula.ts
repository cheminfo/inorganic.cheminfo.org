import { finishValidation } from 'react-cheminfo/core';

import { mainClass } from '../chemistry/classes.ts';
import type { ParsedFormula } from '../chemistry/formula.ts';
import {
  atomCounts,
  canonicalFormula,
  elementName,
  formulaText,
  readFormula,
} from '../chemistry/formula.ts';
import type { Compound, CompoundClass } from '../data/compounds.ts';
import { COMPOUNDS } from '../data/compounds.ts';
import { lowerFirst, shownName } from '../data/names.ts';
import { emptyCase, unreadableCase } from '../exercises/cases.ts';
import type { AnswerCheck, Answers, SeriesTool } from '../exercises/types.ts';

const FIELD = 'formula';
const LABEL = 'Formula';

/** Write the formula of a compound from its name. */
export const FORMULA_TOOL: SeriesTool<Compound> = {
  id: 'formula',
  pool: COMPOUNDS,
  key: (compound) => compound.formula,
  level: (compound) => (compound.level === 'school' ? 'beginner' : 'advanced'),
  fields: () => [
    {
      key: FIELD,
      label: LABEL,
      placeholder: 'e.g. Na2O',
      inputMode: 'text',
    },
  ],
  grade: gradeFormulaAnswer,
  hints: formulaHints,
  solution: (compound) => `**${formulaText(compound.formula)}**`,
};

/**
 * Grade a formula: any spelling of the right one passes, `NaOH` as `HONa`.
 * @param compound - The compound asked about.
 * @param answers - The formula typed.
 * @returns One case.
 */
export function gradeFormulaAnswer(
  compound: Compound,
  answers: Answers,
): AnswerCheck {
  const typed = answers[FIELD] ?? '';
  if (typed.trim() === '') {
    return finishValidation([emptyCase(LABEL, 'a formula')]);
  }
  let parsed: ParsedFormula;
  try {
    parsed = readFormula(typed);
  } catch {
    return finishValidation([unreadableCase(LABEL, typed, 'a formula')]);
  }
  const passed = canonicalFormula(typed) === canonicalFormula(compound.formula);
  let reason = `Right: ${formulaText(compound.formula)}.`;
  if (!passed) {
    if (parsed.charge !== 0) {
      reason = 'A compound is neutral: its formula carries no charge.';
    } else if (sameElements(parsed, readFormula(compound.formula))) {
      reason = 'The elements are right; check how many atoms of each.';
    } else {
      reason = `Not the formula of ${lowerFirst(shownName(compound.formula))}: check which elements its name names.`;
    }
  }
  return finishValidation([{ label: LABEL, passed, reason, actual: typed }]);
}

/**
 * Hints for writing a formula: the rule of its class, its elements, then how
 * many atoms of each.
 * @param compound - The compound asked about.
 * @returns Three hints.
 */
export function formulaHints(compound: Compound): string[] {
  const counts = atomCounts(readFormula(compound.formula));
  const names = [...counts.keys()].map((symbol) =>
    elementName(symbol).toLowerCase(),
  );
  const atoms = [...counts]
    .map(([symbol, count]) => `${symbol} ${count}`)
    .join(', ');
  return [
    FORMULA_RULES[mainClass(compound)],
    `It holds ${names.slice(0, -1).join(', ')}${names.length > 1 ? ' and ' : ''}${names.at(-1) ?? ''}.`,
    `Atoms: ${atoms}.`,
  ];
}

const FORMULA_RULES: Readonly<Record<CompoundClass, string>> = {
  'metal-oxide':
    'A metal oxide: the positive charges of the metal balance the oxide ions, O²⁻. A Roman numeral gives the charge of the metal.',
  hydroxide:
    'A hydroxide: the charge of the metal balances the hydroxide ions, OH⁻, written in parentheses when there are several.',
  peroxide:
    'A peroxide: the charge of the metal balances the peroxide ion, O₂²⁻, which keeps its two oxygens together.',
  'nonmetal-oxide':
    'The [[greek prefix|Greek prefixes]] give the number of each atom: di- 2, tri- 3, tetra- 4, penta- 5, hexa- 6, hepta- 7.',
  covalent:
    'The [[greek prefix|Greek prefixes]] give the number of each atom: di- 2, tri- 3, tetra- 4, penta- 5, hexa- 6.',
  acid: 'An acid: its hydrogens first, then the element, then the oxygens of an [[oxoacid]].',
};

function sameElements(first: ParsedFormula, second: ParsedFormula): boolean {
  const a = [...atomCounts(first).keys()].toSorted();
  const b = [...atomCounts(second).keys()].toSorted();
  return (
    a.length === b.length && a.every((symbol, index) => symbol === b[index])
  );
}
