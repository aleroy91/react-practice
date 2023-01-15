import React, { useContext, useState } from "react";
import { useSelectedTableColumns } from "./tableColumnsContext";
import { useTableData, useTableDataUpdate } from "./tableDataContext";

const TableSortOrderContext = React.createContext();
const TableSortOrderUpdateContext = React.createContext();

export const useTableSortOrder = () => {
  return useContext(TableSortOrderContext);
};

export const useTableSortOrderUpdate = () => {
  return useContext(TableSortOrderUpdateContext);
};

export const TableSortOrderProvider = ({ children }) => {
  const selectedTableColumns = useSelectedTableColumns();
  const recordData = useTableData();
  const setRecordData = useTableDataUpdate();

  const [sortOrder, setSortOrder] = useState(
    selectedTableColumns.map(() => false)
  );

  const sortData = (columnName, columnIndex, highToLow) => {
    const typeOfDataInColumnName = typeof recordData[0][columnName];

    let sortedData = [...recordData];
    let newSortOrder = sortOrder;

    newSortOrder[columnIndex] = highToLow;
    setSortOrder(newSortOrder);

    if (typeOfDataInColumnName === "number") {
      sortedData.sort((a, b) => {
        if (highToLow) {
          return b[columnName] - a[columnName];
        } else {
          return a[columnName] - b[columnName];
        }
      });
    } else if (typeOfDataInColumnName === "string") {
      sortedData.sort((a, b) => {
        const columnNameA = a[columnName].toUpperCase();
        const columnNameB = b[columnName].toUpperCase();

        if (highToLow) {
          if (columnNameA < columnNameB) {
            return -1;
          }

          if (columnNameA > columnNameB) {
            return 1;
          }
        } else {
          if (columnNameA > columnNameB) {
            return -1;
          }

          if (columnNameA < columnNameB) {
            return 1;
          }
        }

        return 0;
      });
    } else {
      console.error(
        "A sort was not performed as the data provided was neither of type string nor type number"
      );
    }

    setRecordData(sortedData);
  };

  return (
    <TableSortOrderContext.Provider value={sortOrder}>
      <TableSortOrderUpdateContext.Provider value={sortData}>
        {children}
      </TableSortOrderUpdateContext.Provider>
    </TableSortOrderContext.Provider>
  );
};
