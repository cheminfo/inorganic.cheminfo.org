# inorganic.cheminfo.org

Name an inorganic compound from its formula, and write its formula from its
name — with a step-by-step tutorial, graded exercises and the rules on one page.

| Page     | Address          | What it does                                          |
| -------- | ---------------- | ----------------------------------------------------- |
| Tutorial | `/tutorial/<id>` | One class of compounds per step, then one to name     |
| Name it  | `/`              | Formula → name, with a tip saying what is off         |
| Write it | `/formula`       | Name → formula, in any order of the elements          |
| Rules    | `/rules`         | The naming rules on one printable page                |
| About    | `/about`         | What the site is, what it is built on, how to cite it |

A tool page carries `?seed=`, the series of questions on screen: the address bar
is always the link that reopens the same questions. `?count=` sets the length of
a series, `?level=` (`school`, `university`) and `?class=` (`metal-oxide`,
`hydroxide`, `peroxide`, `nonmetal-oxide`, `covalent`, `acid`) narrow it,
`?embed` frames the page in a course, and `?hide=` switches parts off
(`filters`, `solutions`, `tabs`).

## Grading a name

A name is compared with every name the compound accepts, whatever its case, with
or without a space before a parenthesis, in American or British spelling
(aluminium, caesium, sulphur). A wrong name is measured against each accepted
name, and the closest tip is given: spacing, a missing or wrong Roman numeral,
digits, letters in the wrong order, one letter out.

## Development

```sh
npm install
npm run dev        # http://localhost:10923
npm run test       # unit tests, types, tokens, deployment contract, lint, format
npm run test-e2e   # Playwright
npm run build
```

## Content and languages

The pool is language-free (`src/data/compounds.ts`: formula, level, classes);
the accepted names are per locale, in `src/data/locales/en.ts` and
`src/data/locales/fr.ts`, the one a solution shows first. The tutorial splits
the same way: `src/data/tutorial.ts` holds each step's examples, and
`src/data/locales/tutorial.en.ts` its prose. Only English is rendered today.
`data/source/` holds the sheet the pool was built from, with its French names.

## Deployment

```sh
cp .env.example .env    # uncomment one COMPOSE_FILE line
docker compose up -d
```

The server's global `deploy.sh` pulls, tags and health-checks the image
(`/health`). `TRACKING_SCRIPT` in `.env` injects the analytics snippet into
every page at container start; unset, nothing is loaded.

## License

MIT
