import { NAMES_EN } from './locales/en.ts';

/**
 * Every name a compound accepts, in the language the site speaks.
 * @param formula - The compound, as the data writes it.
 * @returns Its names, the one a solution shows first.
 */
export function acceptedNames(formula: string): readonly string[] {
  return NAMES_EN[formula] ?? [];
}

/**
 * The name a question or a solution shows.
 * @param formula - The compound, as the data writes it.
 * @returns Its first name, or the formula itself when the data names none.
 */
export function shownName(formula: string): string {
  return acceptedNames(formula)[0] ?? formula;
}

/**
 * A name as it sits inside a sentence: its first letter in lower case, its
 * Roman numerals untouched.
 * @param name - A name as the data writes it, e.g. `Iron(III) oxide`.
 * @returns E.g. `iron(III) oxide`.
 */
export function lowerFirst(name: string): string {
  return `${name.slice(0, 1).toLowerCase()}${name.slice(1)}`;
}
