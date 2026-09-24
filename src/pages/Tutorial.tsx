import { FormGroup, InputGroup } from '@blueprintjs/core';
import type { ReactElement } from 'react';
import { useId, useState } from 'react';
import {
  ClickToCopy,
  GlossaryText,
  TestCaseList,
  TutorialStepStrip,
  useTabRoute,
} from 'react-cheminfo/ui';

import { COMPOUNDS } from '../data/compounds.ts';
import {
  TUTORIAL_EN,
  TUTORIAL_LEVEL_LABELS_EN,
} from '../data/locales/tutorial.en.ts';
import { shownName } from '../data/names.ts';
import type { TutorialStepSkeleton } from '../data/tutorial.ts';
import { TUTORIAL_STEPS } from '../data/tutorial.ts';
import type { FieldCase } from '../exercises/types.ts';
import { CalculatorTable } from '../shared/CalculatorTable.tsx';
import { CopyableFormula } from '../shared/CopyableFormula.tsx';
import { openStep, router } from '../state/router.ts';
import { NAME_TOOL } from '../tools/name.ts';

/**
 * The tutorial: one class of compounds per step, its rule, worked examples,
 * and a compound to name before moving on.
 * @returns The page.
 */
export function Tutorial(): ReactElement {
  const { id } = useTabRoute(router);
  const found = TUTORIAL_STEPS.findIndex((step) => step.id === id);
  const index = Math.max(found, 0);
  const step = TUTORIAL_STEPS[index];

  return (
    <div className="tutorial">
      <header className="page-head">
        <h1 className="page__title">Inorganic nomenclature, step by step</h1>
        <p className="page__lead">
          One class of compounds per step: its rule, worked examples, then a
          compound to name yourself.
        </p>
      </header>
      <TutorialStepStrip
        steps={TUTORIAL_STEPS.map((entry) => ({
          id: entry.id,
          title: TUTORIAL_EN[entry.id]?.title ?? entry.id,
          level: entry.level,
        }))}
        activeIndex={index}
        onSelect={(next) => {
          const target = TUTORIAL_STEPS[next];
          if (target !== undefined) openStep(target.id);
        }}
        levelLabels={TUTORIAL_LEVEL_LABELS_EN}
      />
      {step === undefined ? null : <StepCard key={step.id} step={step} />}
    </div>
  );
}

function StepCard(props: { step: TutorialStepSkeleton }): ReactElement {
  const { step } = props;
  const text = TUTORIAL_EN[step.id];
  return (
    <article className="panel tutorial__step">
      <h2 className="panel__title">{text?.title}</h2>
      <p className="tutorial__description">
        <GlossaryText text={text?.description ?? ''} />
      </p>
      <CalculatorTable headers={['Formula', 'Name']}>
        {step.examples.map((formula) => (
          <tr key={formula}>
            <CopyableFormula as="td" formula={formula} />
            <ClickToCopy as="td" label="name" value={shownName(formula)}>
              {shownName(formula)}
            </ClickToCopy>
          </tr>
        ))}
      </CalculatorTable>
      <Practice formula={step.practice} />
    </article>
  );
}

function Practice(props: { formula: string }): ReactElement {
  const { formula } = props;
  const [typed, setTyped] = useState('');
  const id = useId();
  const compound = COMPOUNDS.find((entry) => entry.formula === formula);
  if (compound === undefined) return <p>{formula}</p>;
  const check = NAME_TOOL.grade(compound, { name: typed });

  return (
    <section className="tutorial__practice" aria-labelledby={`${id}-title`}>
      <h3 className="tutorial__practice-title" id={`${id}-title`}>
        Your turn: name <CopyableFormula formula={formula} />
      </h3>
      <FormGroup label="Name" labelFor={id}>
        <InputGroup
          id={id}
          value={typed}
          placeholder="Type the name, it is checked as you go"
          onValueChange={setTyped}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </FormGroup>
      {typed.trim() === '' ? null : (
        <TestCaseList<FieldCase>
          results={check.cases}
          label={(verdict) => verdict.label}
        />
      )}
    </section>
  );
}
