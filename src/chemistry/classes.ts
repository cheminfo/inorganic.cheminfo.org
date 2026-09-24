import type { Compound, CompoundClass } from '../data/compounds.ts';

import { atomCounts, readFormula } from './formula.ts';

/** How each class is named, in the words of the rules page. */
export const CLASS_LABELS: Readonly<Record<CompoundClass, string>> = {
  'metal-oxide': 'Metal oxides',
  'nonmetal-oxide': 'Non-metal oxides',
  hydroxide: 'Hydroxides',
  peroxide: 'Peroxides',
  acid: 'Acids',
  covalent: 'Covalent compounds',
};

/**
 * The class a compound is taught under: the first it belongs to.
 * @param compound - The compound.
 * @returns Its class.
 */
export function mainClass(compound: Compound): CompoundClass {
  return compound.classes[0] ?? 'covalent';
}

/**
 * The charge of the metal of an oxide, a hydroxide or a peroxide, from the
 * formula: what balances the oxygens and the hydrogens.
 * @param compound - The compound.
 * @returns The charge of one metal atom, or null when the compound has not one
 * metal element, or when its metal atoms do not all carry the same whole charge
 * (Mn₃O₄ holds Mn²⁺ and Mn³⁺).
 */
export function metalCharge(compound: Compound): number | null {
  const counts = atomCounts(readFormula(compound.formula));
  const metals = [...counts.keys()].filter(
    (symbol) => symbol !== 'O' && symbol !== 'H',
  );
  const [metal] = metals;
  if (metal === undefined || metals.length !== 1) return null;
  const oxygenCharge = compound.classes.includes('peroxide') ? -1 : -2;
  const others = oxygenCharge * (counts.get('O') ?? 0) + (counts.get('H') ?? 0);
  const charge = -others / (counts.get(metal) ?? 1);
  return Number.isInteger(charge) ? charge : null;
}
