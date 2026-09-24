import { Callout } from '@blueprintjs/core';
import { useSignals } from '@preact/signals-react/runtime';
import type { ReactElement, ReactNode } from 'react';
import { useMemo } from 'react';

import type { Compound } from '../data/compounds.ts';
import { COMPOUNDS } from '../data/compounds.ts';
import { filterCompounds } from '../data/filters.ts';
import type { SeriesTool } from '../exercises/types.ts';
import type { ToolTab } from '../routes.ts';
import { preferences } from '../state/preferences.ts';

import { CompoundFilters } from './CompoundFilters.tsx';
import { ExerciseSeries } from './ExerciseSeries.tsx';

interface NamingSeriesProps {
  tab: ToolTab;
  /** The tool, over the whole pool; the filters narrow it. */
  tool: SeriesTool<Compound>;
  label: (compound: Compound) => ReactNode;
  prompt: (compound: Compound) => ReactNode;
}

/**
 * A naming series drawn from the compounds the level and class filters leave.
 * @param props - The tool and how to draw its questions.
 * @returns The filters, then the series.
 */
export function NamingSeries(props: NamingSeriesProps): ReactElement {
  useSignals();
  const { tab, tool, label, prompt } = props;
  const level = preferences.level.value;
  const compoundClass = preferences.compoundClass.value;
  const narrowed = useMemo(
    () => ({ ...tool, pool: filterCompounds(COMPOUNDS, level, compoundClass) }),
    [tool, level, compoundClass],
  );
  return (
    <>
      <CompoundFilters />
      {narrowed.pool.length === 0 ? (
        <Callout intent="primary" icon="filter-remove">
          No compound is both of this level and of this class: widen one of the
          two filters.
        </Callout>
      ) : (
        <ExerciseSeries
          tab={tab}
          tool={narrowed}
          label={label}
          prompt={prompt}
        />
      )}
    </>
  );
}
