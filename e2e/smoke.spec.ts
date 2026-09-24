import { expect, test } from '@playwright/test';

const PAGES = [
  { path: '/', heading: 'Name the compound' },
  { path: '/formula', heading: 'Write the formula' },
  { path: '/tutorial', heading: 'Inorganic nomenclature, step by step' },
  {
    path: '/tutorial/oxoacids',
    heading: 'Inorganic nomenclature, step by step',
  },
  { path: '/rules', heading: 'The rules of naming' },
];

for (const { path, heading } of PAGES) {
  test(`${path} opens, with no error in the console`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(path);
    await expect(
      page.getByRole('heading', { level: 1, name: heading, exact: true }),
    ).toBeVisible();
    expect(errors).toStrictEqual([]);
  });
}

test('the bar moves between the pages, and the address follows', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Write it', exact: true }).click();
  await expect(page).toHaveURL(/\/formula\?seed=\d+$/);
  await expect(page).toHaveTitle(
    'Write the formula of an inorganic compound — inorganic.cheminfo.org',
  );
});
