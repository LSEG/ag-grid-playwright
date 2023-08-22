import React, { cloneElement, useEffect } from 'react';

export interface AGGridTestHarnessProps {
  gridId: string;
  children: any;
}

const AGGridTestHarness = (props: AGGridTestHarnessProps) => {
  const { gridId, children } = props;

  useEffect(() => {
    window.__AG_GRID_TEST__ = window.__AG_GRID_TEST__ || {};
    const cleanUp = () => {
      if (window.isE2E) {
        if (window.__AG_GRID_TEST__[gridId]) {
          delete window.__AG_GRID_TEST__[gridId];
        }
      }
    };
    return cleanUp;
  }, []);
  const { onGridReady, classNames } = props.children;

  const parentOnGridReady = (grid: any) => {
    if (onGridReady) {
      onGridReady(grid);
    }
    if (window.isE2E) {
      window.__AG_GRID_TEST__[gridId] = grid;
    }
  }

  const className = `${classNames} ${gridId}`;
  const gridProps = { onGridReady: parentOnGridReady, className };
  let GridComp = cloneElement(children, gridProps);
  return GridComp;
};

export default AGGridTestHarness;
