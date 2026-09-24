import type { ExerciseLevel } from 'react-cheminfo/core';

/** One step of the tutorial, without its prose. */
export interface TutorialStepSkeleton {
  /** Stable and URL-safe: it is what `/tutorial/<id>` carries. */
  id: string;
  level: ExerciseLevel;
  /** Compounds of the pool the step names as its worked examples. */
  examples: readonly string[];
  /** The compound the student names at the end of the step. */
  practice: string;
}

/**
 * The tutorial, one class of compounds per step, in teaching order: the metals
 * first, then the non-metals, then the acids. Language-free: the titles and
 * the prose live in `locales/tutorial.*.ts`, so a translation can never break a
 * step's examples or its address.
 */
export const TUTORIAL_STEPS: readonly TutorialStepSkeleton[] = [
  {
    id: 'metal-oxides',
    level: 'beginner',
    examples: ['Na2O', 'MgO', 'Al2O3'],
    practice: 'CaO',
  },
  {
    id: 'stock-numbers',
    level: 'beginner',
    examples: ['Fe2O3', 'Cu2O', 'CuO'],
    practice: 'CrO3',
  },
  {
    id: 'hydroxides',
    level: 'beginner',
    examples: ['NaOH', 'Ca(OH)2', 'Cu(OH)2'],
    practice: 'Al(OH)3',
  },
  {
    id: 'peroxides',
    level: 'beginner',
    examples: ['Na2O2', 'CaO2', 'K2O2'],
    practice: 'MgO2',
  },
  {
    id: 'nonmetal-oxides',
    level: 'intermediate',
    examples: ['CO', 'CO2', 'P2O5'],
    practice: 'SiO2',
  },
  {
    id: 'covalent',
    level: 'intermediate',
    examples: ['SF6', 'PCl3', 'CCl4'],
    practice: 'PCl5',
  },
  {
    id: 'binary-acids',
    level: 'advanced',
    examples: ['HCl', 'HF', 'H2S'],
    practice: 'HBr',
  },
  {
    id: 'oxoacids',
    level: 'advanced',
    examples: ['HClO4', 'HClO3', 'HClO2', 'HClO'],
    practice: 'HNO2',
  },
];
