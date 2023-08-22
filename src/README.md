# `ag-grid-playwright`
This package lets you test ag-grid using Playwright in a simple, consistent, and extensive way. You can test simple rows and columns or extend it to test ag-grid from playwright in it's entirety.

Read more about the motivation for this plugin [here](#motivation).

## Installation
Requires React 18
```sh
npm install ag-grid-playwright
```

## Usage
Wrap your React ag-grid with AGGridTestHarness and give it a unique gridId.

```jsx
      <AGGridTestHarness gridId="my-grid-id">
        <AgGridReact rowData={[...]} columnDefs={[...]} />
      </AGGridTestHarness>
```

Your test code has access to rows and columns with one call from ag-grid api or DOM.

```jsx
  // from ag-grid api
  const agGridApiRows = await page.evaluate(() => window.agGrid.getApiRows('my-grid-id'));
  const agGridApiColumns = await page.evaluate(() => window.agGrid.getApiColumns('my-grid-id'));

  // from rendered dom
  const agGridDomRows = await page.evaluate(() => window.agGrid.getDomRows('my-grid-id'));
  const agGridDomColumns = await page.evaluate(() => window.agGrid.getDomColumns('my-grid-id'));
```

## Example
```jsx
      <AGGridTestHarness gridId="my-grid-id">
        <AgGridReact
          rowData={[
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxster", price: 72000 }
          ]}
          columnDefs={[{ field: 'make' },{ field: 'model' },{ field: 'price' }]
        } />
      </AGGridTestHarness>
```

In your test you can now access the raw grid api rows and columns or via the neatly with getApiRows, getApiColumns, getDomRows, and getDomColumns.

```jsx
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.addInitScript({ path: 'node_modules/playwright-ag-grid/aggrid-test-util.js' });
});

test('Test our AGGrids rows and columns match the data we expect', async ({ page }) => {
  const expectedRows = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 }
  ];

  const expectedColumns = ['make', 'model', 'price'];
  await page.goto('http://mypage.com');
  const grid = page.locator('.my-grid-id');
  await grid.waitFor();

  const agGridApiRows = await page.evaluate(() => window.agGrid.getApiRows('my-grid-id'));
  const agGridApiColumns = await page.evaluate(() => window.agGrid.getApiColumns('my-grid-id'));

  expect(agGridApiRows).toEqual(expectedRows);
  expect(agGridApiColumns).toEqual(expectedColumns);

});
```

## Demo & Further Examples Code / Tests
Run the following to commands in separate consoles in order to start the demo app and run the Playwright tests.

In the **examples** folder run
```js
  npm install
  npm run dev
```

in the **test** folder run
```js
  npm install
  npm run tests
```

Check out https://github.com/LSEG/ag-grid-playwright/tree/main/examples for full example app and https://github.com/LSEG/ag-grid-playwright/tree/main/test for full example test.

## How to extend 
Cover all of ag-grid capabilities including enterprise version.

```jsx
// In your test code add a custom script
test.beforeEach(async () => {
  await page.addInitScript({ path: 'node_modules/playwright-ag-grid/aggrid-test-util.js' });
  // add your custom helper
  await page.addInitScript({ path: 'playwright-ag-grid/src/custom-ag-grid-test-util.js' });
});
```

In your custom-ag-grid-test-util.js you can now add custom functions with full access to the ag-grid api. Call any method in https://www.ag-grid.com/react-data-grid/grid-api/. NOTE: You must return json.

```jsx
window.agGrid = ['isFirstNodeExpanded'] = (testId) => {
    const api = window?.__AG_GRID_TEST__[testId]?.api;
    const node = api?.getRowNode(0);
    return node.isExpanded;
  }
```

In your test you can now call your custom test helper.

```jsx
test('Test using our custom AGGrids helper', async ({ page }) => {
  await page.goto('http://mypage.com');
  const grid = page.locator('.my-grid-id');
  await grid.waitFor();

  const isFirstNodeExpanded = await page.evaluate(() => window.agGrid.isFirstNodeExpanded('my-grid-id'));
  expect(isFirstNodeExpanded).toEqual(false);
});
```

To debug your custom helpers keep pause page execution with a while statement and set playwright headless config to false
https://playwright.dev/docs/api/class-testoptions#test-options-headless

```jsx
test('Test using our custom AGGrids helper', async ({ page }) => {
  await page.goto('http://mypage.com');
  const grid = page.locator('.my-grid-id');
  await grid.waitFor();
  while(true) {}; //add for debugging
  const isFirstNodeExpanded = await page.evaluate(() => window.agGrid.isFirstNodeExpanded('my-grid-id'));
  expect(isFirstNodeExpanded).toEqual(false);
});
```

You can now debug your helpers fully in Chrome.

## Motivation

### Problem
There currently is not an easy way to test ag-grid extensively with Playwright (or Cypress). You get bogged down with endless class selectors which are bittle and hard to maintain and read.

### Solution
ag-grid-playwright creates a single link between your ag-grid and instance and test code allowing full access to the ag-grid's api in memory as your test code interacts with it. Furthermore, all of the DOM selectors to access the raw DOM elements can be isolated to a single aggrid-test-util.js helper class making it easier to read and maintain.