import { expect, test } from '@playwright/test';

test.beforeEach( async ({ page }) => {
  await page.addInitScript({ path: '../src/lib/aggrid-test-util.js' });
  await page.addInitScript({ path: './custom-ag-grid-util.js' });
});

test('Test using our custom AGGrids helper', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const grid = page.locator('.my-grid-id');
  await grid.waitFor();
  const isFirstNodeExpanded = await page.evaluate(() => window.agGrid.isFirstNodeExpanded('my-grid-id'));
  expect(isFirstNodeExpanded).toEqual(false);
});
