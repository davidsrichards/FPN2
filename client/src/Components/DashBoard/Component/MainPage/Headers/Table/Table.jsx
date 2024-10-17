import "./Table.css";
import { useTable } from "react-table";
import * as React from "react";
import { Data } from "../../Data/Data";
import Filter from "../Filter/Filter";
import { useSelector } from "react-redux";

// Table Function

function Table() {
  const data = React.useMemo(() => Data, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "S/N",
        accessor: "s/n",
      },

      {
        Header: "Name",
        accessor: "name",
      },

      {
        Header: "Matrc No",
        accessor: "matno",
      },

      {
        Header: "Programme",
        accessor: "programme",
      },

      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // jsx
  const { showDialog } = useSelector((state) => state.admissionSlice);

  return (
    <div className="w-full">
      <div
        className={`flex items-center justify-center sha-dow bg-[#fff] rounded-md p-4 parent relative ${
          showDialog && "dim"
        }`}
      >
        {showDialog && (
          <div className="fixed  sm:w-1/2">
            <Filter />
          </div>
        )}
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                key={Math.random()}
                className={`${
                  !showDialog && "border-b-2"
                } border-slate-100 pb-4 font-semibold sm:text-lg text-sm`}
              >
                {headerGroup.headers.map((column) => (
                  <td
                    {...column.getHeaderProps()}
                    key={Math.random()}
                    className="pb-4"
                  >
                    {column.render("Header")}
                  </td>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);

              return (
                <tr
                  {...row.getRowProps()}
                  key={Math.random()}
                  className={`text-slate-500 ${
                    !showDialog && "border-b-2 hover:bg-gray-200"
                  } border-slate-100`}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      key={Math.random()}
                      className="pb-2 py-2 text-[0.8em]"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
