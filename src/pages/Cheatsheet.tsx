import type { ReactElement } from 'react';
import { ReferenceGrid } from 'react-cheminfo/ui';

import { CHEATSHEET } from '../data/cheatsheet.ts';

/**
 * The naming rules, on one printable page.
 * @returns The page.
 */
export function Cheatsheet(): ReactElement {
  return (
    <div className="cheatsheet">
      <header className="page-head">
        <h1 className="page__title">The rules of naming</h1>
        <p className="page__lead">
          Every rule the tutorial teaches and the exercises check, class by
          class. Print it: the chrome is left out.
        </p>
      </header>
      <ReferenceGrid sections={CHEATSHEET} />
    </div>
  );
}
