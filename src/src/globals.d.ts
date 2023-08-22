export {};

declare global {
  interface Window {
    __AG_GRID_TEST__: { [key: string]: any },
    isE2E: boolean;
    agGrid: {
        [key: string]: (testId: string) => any
    };
  }
}