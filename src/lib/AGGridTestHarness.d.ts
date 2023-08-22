import React from 'react';
export interface AGGridTestHarnessProps {
    gridId: string;
    children: any;
}
declare const AGGridTestHarness: (props: AGGridTestHarnessProps) => React.DetailedReactHTMLElement<{
    onGridReady: (grid: any) => void;
    className: string;
}, HTMLElement>;
export default AGGridTestHarness;
