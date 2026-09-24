import type { ClassFilter, LevelFilter } from '../state/preferences.ts';

import type { Compound } from './compounds.ts';

/**
 * The compounds a series is drawn from under a level and a class.
 * @param compounds - Every compound.
 * @param level - A level, or `all`.
 * @param compoundClass - A class, or `all`.
 * @returns The compounds that match both, in pool order.
 */
export function filterCompounds(
  compounds: readonly Compound[],
  level: LevelFilter,
  compoundClass: ClassFilter,
): Compound[] {
  const kept: Compound[] = [];
  for (const compound of compounds) {
    if (level !== 'all' && compound.level !== level) continue;
    if (compoundClass !== 'all' && !compound.classes.includes(compoundClass)) {
      continue;
    }
    kept.push(compound);
  }
  return kept;
}
