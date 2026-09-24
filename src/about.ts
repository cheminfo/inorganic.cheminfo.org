/**
 * What this site says about itself: the record the shared About page is drawn
 * from. The prose limits are checked by `aboutProblems` in the test suite, so
 * this file never grows into a page nobody reads.
 */

import { BUILD_INFO } from 'react-cheminfo/build-info';
import type { AboutContent } from 'react-cheminfo/core';
import { PLATFORM_WORK, TEACHING_WORK } from 'react-cheminfo/core';

/** The About record of inorganic.cheminfo.org. */
export const ABOUT: AboutContent = {
  siteId: 'inorganic',
  // Which release, built when, from which commit: the build says so.
  build: BUILD_INFO,
  what: 'Name an inorganic compound from its formula, and write its formula from its name, with a tutorial and graded exercises.',
  can: [
    'Learn the naming rules class by class, from metal oxides to oxoacids.',
    'Name 187 oxides, hydroxides, peroxides, acids and covalent compounds.',
    'Write the formula of each from its name, in any order of the elements.',
    'Hear what is off in a name: a Roman numeral, a prefix, a single letter.',
    'Draw a series from one class or one level, and print the rules.',
    'Hand out a series of questions as a link, or frame it in a course page.',
  ],
  paragraphs: [
    'A name is compared to every name the compound accepts, in either American or British spelling. When it is wrong, the site says how: a missing or wrong Roman numeral, spaces and parentheses, swapped words, one letter out.',
    'A series of questions is drawn from its seed, and the seed is in the address, so the link on screen reopens the same questions for anyone: a teacher hands one series to a whole class.',
  ],
  people: [{ name: 'Luc Patiny' }],
  providedBy: ['epfl'],
  credits: [
    'mass-tools',
    'react-mf',
    'ml-xsadd',
    'react-cheminfo',
    'blueprint',
    'preact-signals',
    'react',
    'vite',
  ],
  cite: [PLATFORM_WORK, TEACHING_WORK],
};
