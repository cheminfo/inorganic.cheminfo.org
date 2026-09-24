import type { ReactElement } from 'react';
import { ClickToCopy } from 'react-cheminfo/ui';

import { shownName } from '../data/names.ts';
import { NamingSeries } from '../shared/NamingSeries.tsx';
import { ToolPage } from '../shared/ToolPage.tsx';
import { FORMULA_TOOL } from '../tools/formula.ts';

/**
 * Write the formula of a compound from its name.
 * @returns The page.
 */
export function WriteIt(): ReactElement {
  return (
    <ToolPage
      title="Write the formula"
      lead="The name gives the ions and their charges, or counts the atoms with [[greek prefix|Greek prefixes]]: the formula follows. Any order of the elements is accepted."
      exercises={
        <NamingSeries
          tab="formula"
          tool={FORMULA_TOOL}
          label={(compound) => shownName(compound.formula)}
          prompt={(compound) => (
            <>
              <p className="question-compound">
                <ClickToCopy
                  className="question-compound__name"
                  label="name"
                  value={shownName(compound.formula)}
                >
                  {shownName(compound.formula)}
                </ClickToCopy>
              </p>
              <p>What is its formula?</p>
            </>
          )}
        />
      }
    />
  );
}
