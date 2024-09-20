import React from "react";
import { useFilters, useGlobalFilter, useTable } from "react-table";
import SpinnerLoading from "../Spinnerloading";

const Table = ({ columns, data, loading, onRowClick }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable({ columns, data }, useFilters, useGlobalFilter);

  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        {...getTableProps()}
        className="w-full border border-gray-200 shadow-lg"
      >
        <thead>
          {headerGroups?.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup?.headers?.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="bg-[black] text-white px-4 py-3"
                >
                  {column.render("Header")}
                  <div>{column?.Filter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="px-4 py-2">
          {loading ? (
            <tr>
              <td
                colSpan={columns?.length}
                className="text-center px-4 py-2"
              >
                <SpinnerLoading sx={{ color: "#212121" }} />
              </td>
            </tr>
          ) : rows?.length === 0 && !loading ? (
            <tr>
              <td colSpan={columns?.length} className="text-center px-4 py-2">
                No data found
              </td>
            </tr>
          ) : (
            rows?.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  {...row?.getRowProps()}
                  className={rowIndex % 2 !== 0 ? "bg-gray-300 " : ""}
                  onClick={() => onRowClick(row)}
                >
                  {row.cells?.map((cell) => (
                    <td
                      {...cell?.getCellProps()}
                      className="border-b border-gray-400 px-4 py-2 text-center align-middle"
                    >
                      {cell?.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
