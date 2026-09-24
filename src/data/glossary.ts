import type { Glossary } from 'react-cheminfo/core';

/**
 * The words the explanations of this site are written in, each defined in one
 * paragraph with a worked example. A `[[term]]` marker in any description,
 * hint or solution opens the entry it names; keys are the lowercased marker.
 */
export const GLOSSARY: Glossary = {
  'oxidation number': {
    title: 'Oxidation number (Stock number)',
    summary:
      'The charge of a metal that takes more than one, written as a Roman numeral in parentheses right after its name. It is worked out from the anions, whose charges it balances.',
    examples: [
      { code: 'FeO', note: 'One O²⁻, so Fe is 2+: iron(II) oxide.' },
      {
        code: 'Fe₂O₃',
        note: 'Three O²⁻ carry 6−, so each Fe is 3+: iron(III) oxide.',
      },
    ],
  },
  'greek prefix': {
    title: 'Greek prefix',
    summary:
      'Between two non-metals no ion charge fixes the formula, so the name counts the atoms: mono- 1, di- 2, tri- 3, tetra- 4, penta- 5, hexa- 6, hepta- 7.',
    examples: [
      { code: 'CO₂', note: 'Carbon dioxide: no mono- on the first element.' },
      { code: 'N₂O₃', note: 'Dinitrogen trioxide.' },
    ],
  },
  oxoacid: {
    title: 'Oxoacid',
    summary:
      'An acid made of hydrogen, oxygen and a central element. Its ending says how much oxygen it holds next to the rest of its family: per…ic, …ic, …ous, hypo…ous.',
    examples: [
      { code: 'HClO₄, HClO₃', note: 'Perchloric and chloric acid.' },
      { code: 'HClO₂, HClO', note: 'Chlorous and hypochlorous acid.' },
    ],
  },
  peroxide: {
    title: 'Peroxide',
    summary:
      'A compound whose anion is two oxygen atoms bonded to each other, O₂²⁻, each at an oxidation state of −1.',
    examples: [
      { code: 'Na₂O₂', note: 'Sodium peroxide: two Na⁺ for one O₂²⁻.' },
      { code: 'H₂O₂', note: 'Hydrogen peroxide.' },
    ],
  },
};
