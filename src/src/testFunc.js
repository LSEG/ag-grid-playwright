export const initAGGridTestHarness = (grid, testId) => {
  if (window?.isE2E) {
     window['__AG_GRID_TEST__'] = window?.__AG_GRID_TEST__ || {};
     window['__AG_GRID_TEST__'][testId] = grid;
  }
};
