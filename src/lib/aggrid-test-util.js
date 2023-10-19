window.isE2E = true;

window.agGrid = {
  getApiRows: (testId) => {
    const rows = [];
    const api = window?.__AG_GRID_TEST__[testId]?.api;
    if (api) {
      api?.forEachNode(n => rows.push(n.data));
    } else {
      new Error(`No ag grid with ${testId} found.`);
    }

    return rows;
  },
  getApiColumns: (testId) => {
    const columns = [];
    const api = window?.__AG_GRID_TEST__[testId]?.api;
    if (api) {
      api?.getColumnDefs().forEach(c => columns.push(c.field))
    }
    else {
      new Error(`No ag grid with ${testId} found.`);
    }
    return columns;
  },
  getDomColumns: (testId) => {
    const columns = [];
    debugger;
    document.querySelectorAll(`.${testId} [role="columnheader"]`)?.forEach(e => columns.push({ columnName: e?.attributes['col-id']?.nodeValue, columnSortIndex: e?.attributes['aria-colindex']?.nodeValue?.columnName }));
    columns.sort((a,b) => a.columnSortIndex - b.columnSortIndex);
    return columns.map(o => o.columnName);
  },
  getDomRows: (testId) => {
    const rows = [];
    document.querySelectorAll(`.${testId} .ag-row`)?.forEach(r => {
      const row = {};
      r.childNodes.forEach(c => row[c.attributes['col-id'].nodeValue] = c.innerHTML);
      rows.push(row);
    });
    return rows;
  }
}