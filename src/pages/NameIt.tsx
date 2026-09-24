import type { ReactElement } from 'react';

import { NamingSeries } from '../shared/NamingSeries.tsx';
import { QuestionCompound } from '../shared/QuestionCompound.tsx';
import { QuestionFormula } from '../shared/QuestionFormula.tsx';
import { ToolPage } from '../shared/ToolPage.tsx';
import { NAME_TOOL } from '../tools/name.ts';

/**
 * Name a compound from its formula.
 * @returns The page.
 */
export function NameIt(): ReactElement {
  return (
    <ToolPage
      title="Name the compound"
      lead="Each class of compound has its own rule: a metal and its [[oxidation number]], [[greek prefix|Greek prefixes]] between non-metals, -ic and -ous for an [[oxoacid]]. The tutorial walks through each."
      exercises={
        <NamingSeries
          tab="name"
          tool={NAME_TOOL}
          label={(compound) => <QuestionFormula formula={compound.formula} />}
          prompt={(compound) => (
            <>
              <QuestionCompound formula={compound.formula} />
              <p>What is the name of this compound?</p>
            </>
          )}
        />
      }
    />
  );
}
