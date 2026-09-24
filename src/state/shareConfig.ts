/**
 * What one link to this site can say beyond the page and the series it opens.
 *
 * `?embed` drops the chrome so a tool can be framed in a course page; `?hide=`
 * switches parts off by name. This module is the only place that knows those
 * names: a component asks through `<PagePart>` and never reads the address.
 */

import type { SharePreset, ShareVocabulary } from 'react-cheminfo/core';

/**
 * The parts an embedder can switch off. Each is named positively — the dialog
 * shows a ticked box for a part that stays — and its description says what
 * switching it off does, for the person building the link.
 */
export const SHARE_VOCABULARY = {
  parts: [
    {
      key: 'tabs',
      label: 'The other pages',
      description:
        'Hiding it removes the bar listing the tutorial and the other tool, so the link stays on this one.',
      inHeader: true,
    },
    {
      key: 'filters',
      label: 'Class and level filters',
      description:
        'Hiding them keeps the class and the level the link names, and stops a student changing them.',
    },
    {
      key: 'solutions',
      label: 'Solutions',
      description:
        'Hiding it removes the Reveal solution button; the hints stay.',
    },
  ],
} as const satisfies ShareVocabulary;

/** The parts a link can switch off, as `?hide=` names them. */
export type HideKey = (typeof SHARE_VOCABULARY)['parts'][number]['key'];

/** The way a series is usually framed in a course page. */
export const SHARE_PRESETS: readonly SharePreset[] = [
  {
    key: 'questions',
    label: 'Questions',
    description:
      'The series alone, framed, drawn from the class and the level on screen, which a student cannot change.',
    hidden: ['filters'],
  },
];
