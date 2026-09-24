/**
 * What a typed name is, next to the names a compound accepts: right, or how far
 * off — so a student hears what to fix rather than only that it is wrong.
 */
export type NameVerdict =
  { correct: true } | { correct: false; tip: NameTip; closest: string };

/**
 * The ways a name can be nearly right, the closest first.
 *
 * - `spacing`: right once spaces, hyphens and parentheses are set aside;
 * - `stock-missing`: right but for the Roman numeral a metal with several
 *   charges needs;
 * - `stock-wrong`: right but for the value of that numeral;
 * - `numbering`: right once the digits are set aside;
 * - `order`: every letter is there, two have swapped;
 * - `one-letter`: one letter is wrong, missing or extra;
 * - `none`: nothing the ladder recognises.
 */
export type NameTip =
  | 'empty'
  | 'spacing'
  | 'stock-missing'
  | 'stock-wrong'
  | 'numbering'
  | 'order'
  | 'one-letter'
  | 'none';

const TIP_ORDER: readonly NameTip[] = [
  'empty',
  'spacing',
  'stock-missing',
  'stock-wrong',
  'numbering',
  'order',
  'one-letter',
  'none',
];

// The spellings a student taught British English writes; both are right.
const SPELLINGS: ReadonlyArray<readonly [string, string]> = [
  ['aluminum', 'aluminium'],
  ['cesium', 'caesium'],
  ['sulf', 'sulph'],
];

const STOCK = /\((?<numeral>[ivx]+(?:,[ivx]+)*)\)/u;

/**
 * Grade a typed name against the names a compound accepts.
 *
 * Case does not matter, nor does a space before a parenthesis, nor the British
 * spelling of aluminium, caesium and sulphur. When the name is wrong, the tip
 * is the closest the ladder finds over every accepted name.
 * @param typed - What the student typed.
 * @param accepted - The names the compound accepts, the one shown first.
 * @returns Right, or the tip and the accepted name it was measured against.
 */
export function gradeName(
  typed: string,
  accepted: readonly string[],
): NameVerdict {
  const answer = normalizeName(typed);
  const [shown = ''] = accepted;
  if (answer === '') return { correct: false, tip: 'empty', closest: shown };

  let best: { tip: NameTip; closest: string } = { tip: 'none', closest: shown };
  for (const name of accepted) {
    for (const spelling of spellingVariants(normalizeName(name))) {
      if (spelling === answer) return { correct: true };
      const tip = tipFor(answer, spelling);
      if (TIP_ORDER.indexOf(tip) < TIP_ORDER.indexOf(best.tip)) {
        best = { tip, closest: name };
      }
    }
  }
  return { correct: false, ...best };
}

/**
 * A name as it is compared: lower case, single spaces, no space before a
 * parenthesis, no space inside a Roman numeral.
 * @param name - A name as typed or as the data writes it.
 * @returns The name to compare.
 */
export function normalizeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replaceAll(/\s+/gu, ' ')
    .replaceAll(/\s*\(\s*/gu, '(')
    .replaceAll(/\s*\)/gu, ')')
    .replaceAll(/\s*,\s*/gu, ',');
}

/**
 * Every spelling of a normalised name, American and British.
 * @param name - A normalised name.
 * @returns The name, and each spelling of it the other variety writes.
 */
export function spellingVariants(name: string): string[] {
  const variants = new Set([name]);
  for (const [american, british] of SPELLINGS) {
    for (const variant of variants) {
      variants.add(variant.replaceAll(american, british));
      variants.add(variant.replaceAll(british, american));
    }
  }
  return [...variants];
}

/**
 * The Roman numeral of a Stock name, and the element it follows.
 * @param name - A name, e.g. `Iron(III) oxide`.
 * @returns The element as written and the numeral, or null for a name
 * without one.
 */
export function stockNumeral(
  name: string,
): { element: string; numeral: string } | null {
  const match = /^(?<element>[^(]+)\((?<numeral>[IVX]+(?:,\s*[IVX]+)*)\)/u.exec(
    name.trim(),
  );
  if (!match?.groups) return null;
  return {
    element: (match.groups.element ?? '').trim(),
    numeral: match.groups.numeral ?? '',
  };
}

function tipFor(answer: string, expected: string): NameTip {
  if (stripSeparators(answer) === stripSeparators(expected)) return 'spacing';
  const numeral = STOCK.exec(expected);
  if (numeral) {
    const bare = normalizeName(expected.replace(STOCK, ' '));
    if (stripSeparators(answer) === stripSeparators(bare)) {
      return 'stock-missing';
    }
    if (STOCK.test(answer)) {
      const replaced = answer.replace(STOCK, numeral[0]);
      if (stripSeparators(replaced) === stripSeparators(expected)) {
        return 'stock-wrong';
      }
    }
  }
  const answerLetters = stripSeparators(answer).replaceAll(/\d/gu, '');
  const expectedLetters = stripSeparators(expected).replaceAll(/\d/gu, '');
  if (answerLetters === expectedLetters) return 'numbering';
  if (sortedLetters(answerLetters) === sortedLetters(expectedLetters)) {
    return 'order';
  }
  if (letterDifference(answerLetters, expectedLetters) < 2) return 'one-letter';
  return 'none';
}

function stripSeparators(name: string): string {
  return name.replaceAll(/[\s\-,;()]/gu, '');
}

function sortedLetters(text: string): string {
  return Array.from(text).toSorted().join('');
}

/**
 * How many letters two words differ by, order aside: those of the shorter one
 * missing from the longer, plus the letters left over.
 * @param first - One word.
 * @param second - The other.
 * @returns The number of letters to add, remove or change.
 */
function letterDifference(first: string, second: string): number {
  const [shorter, longer] =
    first.length <= second.length ? [first, second] : [second, first];
  const pool = new Map<string, number>();
  for (const letter of longer) pool.set(letter, (pool.get(letter) ?? 0) + 1);
  let missing = 0;
  for (const letter of shorter) {
    const left = pool.get(letter) ?? 0;
    if (left > 0) pool.set(letter, left - 1);
    else missing++;
  }
  let extra = 0;
  for (const left of pool.values()) extra += left;
  return Math.max(missing, extra);
}
