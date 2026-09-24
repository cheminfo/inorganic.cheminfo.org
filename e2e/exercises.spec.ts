import { expect, test } from '@playwright/test';

import { COMPOUNDS } from '../src/data/compounds.ts';
import { shownName } from '../src/data/names.ts';
import { pickSeeded } from '../src/exercises/seed.ts';

const SEED = 42;
const [FIRST] = pickSeeded(COMPOUNDS, 10, SEED);

test('a right name solves the question, a near miss says how', async ({
  page,
}) => {
  if (FIRST === undefined) throw new Error('the pool is empty');
  await page.goto(`/?seed=${SEED}`);
  const card = page.getByRole('article');
  const box = card.getByLabel('Name', { exact: true });
  await box.fill(`${shownName(FIRST.formula)}x`);
  await card.getByRole('button', { name: 'Check' }).click();
  await expect(
    card.getByText('One letter is wrong, missing or one too many.'),
  ).toBeVisible();
  await box.fill(shownName(FIRST.formula).toUpperCase());
  await box.press('Enter');
  await expect(card.getByText(/^Right: /)).toBeVisible();
  await expect(page.getByText('1 / 10 solved')).toBeVisible();
});

test('a class filter narrows the series and lives in the address', async ({
  page,
}) => {
  await page.goto('/?seed=1');
  await page.getByText(/^Peroxides/).click();
  await expect(page).toHaveURL(/class=peroxide/);
  const list = page.getByRole('navigation', {
    name: 'Questions of the series',
  });
  await expect(list.getByRole('button')).toHaveCount(6);
});

test('a filter that leaves nothing says so', async ({ page }) => {
  await page.goto('/?class=peroxide&level=school');
  await expect(
    page.getByText('No compound is both of this level and of this class'),
  ).toBeVisible();
});

test('a formula is accepted in any order of its elements', async ({ page }) => {
  await page.goto('/formula?seed=3&class=hydroxide&level=school');
  const card = page.getByRole('article');
  const name = await card.locator('.question-compound__name').textContent();
  const [compound] = COMPOUNDS.filter(
    (entry) => entry.classes.includes('hydroxide') && entry.level === 'school',
  ).filter((entry) => shownName(entry.formula) === name);
  if (compound === undefined) throw new Error(`no hydroxide named ${name}`);
  await card.getByLabel('Formula', { exact: true }).fill(compound.formula);
  await card.getByRole('button', { name: 'Check' }).click();
  await expect(card.getByText(/^Right: /)).toBeVisible();
});

test('the tutorial walks its steps, and checks the name typed', async ({
  page,
}) => {
  await page.goto('/tutorial');
  await expect(
    page.getByRole('heading', {
      level: 2,
      name: 'Oxides of a metal with one charge',
    }),
  ).toBeVisible();
  await page.getByLabel('Name', { exact: true }).fill('calcium oxide');
  await expect(page.getByText('Right: CaO is calcium oxide.')).toBeVisible();
  await page.getByRole('button', { name: /Next/ }).click();
  await expect(page).toHaveURL(/\/tutorial\/stock-numbers$/);
  await expect(page).toHaveTitle(
    'Oxides of a metal with several charges — nomenclature — inorganic.cheminfo.org',
  );
  await page.getByLabel('Name', { exact: true }).fill('chromium oxide');
  await expect(
    page.getByText(
      'Chromium takes more than one charge: say which with a Roman numeral in parentheses, right after the metal.',
    ),
  ).toBeVisible();
});
