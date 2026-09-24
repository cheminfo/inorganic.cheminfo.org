import { useSignals } from '@preact/signals-react/runtime';
import type { ReactElement } from 'react';
import { CapsuleFilter, PagePart } from 'react-cheminfo/ui';

import { CLASS_LABELS } from '../chemistry/classes.ts';
import { COMPOUNDS } from '../data/compounds.ts';
import { filterCompounds } from '../data/filters.ts';
import type { ClassFilter, LevelFilter } from '../state/preferences.ts';
import {
  CLASS_FILTERS,
  LEVEL_FILTERS,
  preferences,
  setClassFilter,
  setLevelFilter,
} from '../state/preferences.ts';

const LEVEL_LABELS: Readonly<Record<LevelFilter, string>> = {
  all: 'Every level',
  school: 'School',
  university: 'University',
};

/**
 * The two rows of capsules a series is drawn under: the level, then the class,
 * each counting what the other leaves.
 * @returns The filters.
 */
export function CompoundFilters(): ReactElement {
  useSignals();
  const level = preferences.level.value;
  const compoundClass = preferences.compoundClass.value;
  return (
    <PagePart part="filters">
      <div className="compound-filters">
        <CapsuleFilter<LevelFilter>
          label="Level"
          value={level}
          onChange={setLevelFilter}
          options={LEVEL_FILTERS.map((option) => ({
            value: option,
            label: LEVEL_LABELS[option],
            count: filterCompounds(COMPOUNDS, option, compoundClass).length,
          }))}
        />
        <CapsuleFilter<ClassFilter>
          label="Class"
          value={compoundClass}
          onChange={setClassFilter}
          options={CLASS_FILTERS.map((option) => ({
            value: option,
            label: option === 'all' ? 'Every class' : CLASS_LABELS[option],
            count: filterCompounds(COMPOUNDS, level, option).length,
          }))}
        />
      </div>
    </PagePart>
  );
}
