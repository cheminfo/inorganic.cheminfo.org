import type { ReferenceSection } from 'react-cheminfo/ui';

/** The naming rules, one section per class, as the rules page prints them. */
export const CHEATSHEET: readonly ReferenceSection[] = [
  {
    id: 'metal-oxides',
    title: 'Metal oxides and hydroxides',
    rows: [
      {
        syntax: 'Na₂O',
        description: 'sodium oxide: the metal, then oxide for O²⁻.',
      },
      {
        syntax: 'Fe₂O₃',
        description:
          'iron(III) oxide: a metal with several charges takes its Roman numeral.',
      },
      {
        syntax: 'Mn₃O₄',
        description: 'manganese(II,III) oxide: two charges in one compound.',
      },
      {
        syntax: 'Ca(OH)₂',
        description:
          'calcium hydroxide: one OH⁻ per positive charge of the metal.',
      },
      {
        syntax: 'Na₂O₂',
        description: 'sodium peroxide: the O₂²⁻ pair, each oxygen at −1.',
      },
    ],
  },
  {
    id: 'prefixes',
    title: 'Two non-metals: Greek prefixes',
    rows: [
      {
        syntax: '1 mono · 2 di · 3 tri',
        description: 'The first element takes no mono-: CO, carbon monoxide.',
      },
      {
        syntax: '4 tetra · 5 penta',
        description:
          'The final a or o drops before oxide: N₂O₅, dinitrogen pentoxide.',
      },
      {
        syntax: '6 hexa · 7 hepta',
        description: 'SF₆, sulfur hexafluoride; Br₂O₇, dibromine heptoxide.',
      },
      {
        syntax: '-ide',
        description:
          'The second element: chloride, fluoride, oxide, sulfide, nitride.',
      },
    ],
  },
  {
    id: 'acids',
    title: 'Acids',
    rows: [
      {
        syntax: 'hydro…ic acid',
        description:
          'A binary acid: HCl, hydrochloric acid; H₂S, hydrosulfuric acid.',
      },
      {
        syntax: 'per…ic acid',
        description: 'One oxygen more than -ic: HClO₄, perchloric acid.',
      },
      {
        syntax: '…ic acid',
        description:
          'The common acid of the family: HClO₃, chloric; H₂SO₄, sulfuric.',
      },
      {
        syntax: '…ous acid',
        description:
          'One oxygen fewer than -ic: HClO₂, chlorous; HNO₂, nitrous.',
      },
      {
        syntax: 'hypo…ous acid',
        description: 'One fewer still: HClO, hypochlorous acid.',
      },
    ],
  },
  {
    id: 'charges',
    title: 'Charges to know',
    rows: [
      {
        syntax: 'groups 1, 2',
        description:
          'Na⁺, K⁺ and Mg²⁺, Ca²⁺: a single charge, no Roman numeral.',
      },
      {
        syntax: 'Al³⁺, Zn²⁺, Cd²⁺',
        description: 'Also a single charge: aluminium oxide, zinc hydroxide.',
      },
      {
        syntax: 'O²⁻, OH⁻, O₂²⁻',
        description: 'Oxide, hydroxide and peroxide.',
      },
    ],
  },
];
