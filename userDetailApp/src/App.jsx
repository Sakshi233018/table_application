import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import userData from "./user_data.json";
import './App.css';
import { 
  FaCheckCircle,    // for “IN_SYNC”
  FaExclamationTriangle, // for warnings
  FaTimesCircle     // for errors or “other”
} from 'react-icons/fa';

function App() {
  // Use the 'subscriptions' array inside your userData JSON
  const data = useMemo(() => userData.subscriptions, []);

  // Columns matching your data keys
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "Formula",
        accessor: "formula",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Sync",
        accessor: "sync",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="App">
      <div className="container">
        <div><header className="title">  <h1>Subscriptions</h1> </header></div>
        <table {...getTableProps()}>
        <thead>
  {headerGroups.map((headerGroup, hgIndex) => (
    <tr {...headerGroup.getHeaderGroupProps()} key={hgIndex}>
      {headerGroup.headers.map((column, colIndex) => (
        <th {...column.getHeaderProps()} key={colIndex}>
          {column.render("Header")}
        </th>
      ))}
    </tr>
  ))}
</thead>
          <tbody {...getTableBodyProps()}>
  {rows.map((row, rowIndex) => {
    prepareRow(row);
    return (
      <tr {...row.getRowProps()} key={rowIndex}>
        {row.cells.map((cell, cellIndex) => {
          let className = '';

          // Add dynamic class for 'status' column
          if (cell.column.id === 'status') {
            if (cell.value === 'ACTIVE') className = 'status-active';
            else if (cell.value === 'SUSPENDED') className = 'status-suspended';
            else className = 'status-other';
          }

          // Add dynamic class for 'sync' column
          if (cell.column.id === 'sync') {
            if (cell.value === 'IN_SYNC') className = 'sync-success';
            else if (cell.value.startsWith('NOT_FOUND')) className = 'sync-other';
            else className = 'sync-warning';
          }

          return (
           <td {...cell.getCellProps()} key={cellIndex}>
  <div className={`cell-bg ${className}`}>
   {cell.column.id === 'sync' ? (
  <div className="cell-sync">
    {cell.value === 'IN_SYNC' && <FaCheckCircle className="icon-sync-success" />}
    {cell.value.startsWith('NOT_FOUND') && <FaExclamationTriangle className="icon-sync-warning" />}
    {!['IN_SYNC'].includes(cell.value) && !cell.value.startsWith('NOT_FOUND') && (
      <FaTimesCircle className="icon-sync-other" />
    )}
    <span className="sync-text">{cell.value}</span>
  </div>
) : (
  cell.render("Cell")
)}
  </div>
</td>
          );
        })}
      </tr>
    );
  })}
</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
