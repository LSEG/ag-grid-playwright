window.agGrid['isFirstNodeExpanded'] = (testId) => {
    const api = window?.__AG_GRID_TEST__[testId]?.api;
    const node = api?.getRowNode(0);
    return node.expanded;
}