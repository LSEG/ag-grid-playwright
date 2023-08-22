import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { AGGridTestHarness } from '../../src/lib/lib';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AGGridTestHarness gridId="my-grid-id">
        <AgGridReact
          rowData={[
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxster", price: 72000 }
          ]}
          columnDefs={[
            { field: 'make' },
            { field: 'model' },
            { field: 'price' }
          ]} />
      </AGGridTestHarness>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
