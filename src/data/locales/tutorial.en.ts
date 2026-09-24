import type { ExerciseLevel } from 'react-cheminfo/core';

/** The prose of one tutorial step. */
export interface TutorialStepText {
  title: string;
  /** What the page teaches; may carry `[[term]]` markers and `**strong**`. */
  description: string;
  /** The sentence the step's own address is indexed under, 110–160 characters. */
  metaDescription: string;
}

/** The three strips of the tutorial, named after what they cover. */
export const TUTORIAL_LEVEL_LABELS_EN: Readonly<Record<ExerciseLevel, string>> =
  {
    beginner: 'Metals',
    intermediate: 'Non-metals',
    advanced: 'Acids',
  };

/** The English prose of every tutorial step, keyed by its id. */
export const TUTORIAL_EN: Readonly<Record<string, TutorialStepText>> = {
  'metal-oxides': {
    title: 'Oxides of a metal with one charge',
    description:
      'A metal oxide is named after its two ions: the metal, then **oxide** for O²⁻. The metals of groups 1 and 2, aluminium and zinc take a single charge, so the name needs nothing more: **sodium oxide**, Na₂O, holds two Na⁺ for each O²⁻.',
    metaDescription:
      'Name the oxide of a metal with a single charge, such as sodium, magnesium or aluminium: the metal, then oxide, the charges balancing each other.',
  },
  'stock-numbers': {
    title: 'Oxides of a metal with several charges',
    description:
      'Iron, copper, chromium and most transition metals take more than one charge. The name then gives it as a Roman numeral in parentheses, right after the metal: its [[oxidation number]]. In Fe₂O₃ three O²⁻ carry 6−, so each Fe is 3+: **iron(III) oxide**.',
    metaDescription:
      'Name the oxides of iron, copper or chromium with a Stock number: the charge of the metal as a Roman numeral, worked out from the oxide ions.',
  },
  hydroxides: {
    title: 'Hydroxides',
    description:
      'The hydroxide ion OH⁻ carries one negative charge, so a metal of charge n takes n of them: **sodium hydroxide**, NaOH; **calcium hydroxide**, Ca(OH)₂. A metal with several charges keeps its Roman numeral: **copper(II) hydroxide**, Cu(OH)₂.',
    metaDescription:
      'Name a metal hydroxide: the metal, its Stock number when it takes several charges, then hydroxide, one OH⁻ group for each positive charge.',
  },
  peroxides: {
    title: 'Peroxides',
    description:
      'In a [[peroxide]] the two oxygen atoms are bonded to each other, O₂²⁻, each of them at −1. **Sodium peroxide**, Na₂O₂, is not an oxide with an oxygen too many: its anion is the O₂²⁻ pair, which the formula keeps together.',
    metaDescription:
      'Recognise and name a peroxide, whose two oxygens are bonded to each other as O₂²⁻: sodium peroxide, calcium peroxide, potassium peroxide.',
  },
  'nonmetal-oxides': {
    title: 'Oxides of a non-metal',
    description:
      'Between two non-metals there are no ions whose charges fix the formula, so the name counts the atoms with a [[greek prefix]]: mono-, di-, tri-, tetra-, penta-, hexa-, hepta-. **Carbon dioxide**, CO₂; **diphosphorus pentoxide**, P₂O₅. The first element takes no mono-, and the final a or o of a prefix drops before oxide.',
    metaDescription:
      'Name the oxide of a non-metal with Greek prefixes counting its atoms: carbon monoxide, carbon dioxide, diphosphorus pentoxide, silicon dioxide.',
  },
  covalent: {
    title: 'Other compounds of two non-metals',
    description:
      'The same prefixes name any compound of two non-metals. The less electronegative element comes first, under its own name; the second takes the ending -ide: **sulfur hexafluoride**, SF₆; **phosphorus trichloride**, PCl₃; **carbon tetrachloride**, CCl₄.',
    metaDescription:
      'Name a compound of two non-metals with Greek prefixes, the second element ending in -ide: sulfur hexafluoride, phosphorus trichloride.',
  },
  'binary-acids': {
    title: 'Binary acids',
    description:
      'Hydrogen bonded to a halogen, or to sulfur, gives an acid in water. Its name is **hydro-**, the root of the element, then **-ic acid**: HCl, **hydrochloric acid**; HF, hydrofluoric acid; H₂S, hydrosulfuric acid.',
    metaDescription:
      'Name a binary acid, hydrogen and one other element dissolved in water: hydro-, the root of the element, then -ic acid, as in hydrochloric acid.',
  },
  oxoacids: {
    title: 'Oxoacids',
    description:
      'An [[oxoacid]] holds hydrogen, oxygen and a central element. The common acid of a family ends in **-ic**; one oxygen fewer gives **-ous**; one fewer still, **hypo…ous**; one more than -ic, **per…ic**. For chlorine: HClO₄ perchloric, HClO₃ chloric, HClO₂ chlorous, HClO **hypochlorous acid**.',
    metaDescription:
      'Name an oxoacid from its oxygen count: -ic and -ous, hypo- and per-, shown on the four oxoacids of chlorine and then on nitric and nitrous acids.',
  },
};
