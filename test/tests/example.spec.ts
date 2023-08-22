import { expect, test } from '@playwright/test';

test.beforeEach( async ({ page }) => {
  await page.addInitScript({ path: '../src/lib/aggrid-test-util.js' });
});

test('Test our AGGrids API rows and columns match the data we expect', async ({ page }) => {

  const expectedRows = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 }
  ];
  const expectedColumns = ['make', 'model', 'price'];

  await page.goto('http://localhost:5173/');

  const grid = page.locator('.my-grid-id');
  
  await grid.waitFor();

  const agGridApiRows = await page.evaluate(() => window.agGrid.getApiRows('my-grid-id'));
  const agGridApiColumns = await page.evaluate(() => window.agGrid.getApiColumns('my-grid-id'));

  expect(agGridApiRows).toEqual(expectedRows);
  expect(agGridApiColumns).toEqual(expectedColumns);

});

test('Test our AGGrids DOM rows and columns match the data we expect', async ({ page }) => {

  const expectedRows = [
    { make: "Toyota", model: "Celica", price: "35000" },
    { make: "Ford", model: "Mondeo", price: "32000" },
    { make: "Porsche", model: "Boxster", price: "72000" }
  ];
  const expectedColumns = ['make', 'model', 'price'];

  await page.goto('http://localhost:5173/');

  const grid = page.locator('.my-grid-id');
  
  await grid.waitFor();

  const agGridDomRows = await page.evaluate(() => window.agGrid.getDomRows('my-grid-id'));
  const agGridDomColumns = await page.evaluate(() => window.agGrid.getDomColumns('my-grid-id'));

  expect(agGridDomRows).toEqual(expectedRows);
  expect(agGridDomColumns).toEqual(expectedColumns);

});
