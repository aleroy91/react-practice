import React, { useContext, useReducer } from "react";
import { mockData } from "../data/mockData";
import { defaultTableSettings } from "../data/defaultTableSettings";
import { tableColumnsFromData } from "../helper-functions/tableColumnsFromData";

export const TableContext = React.createContext();
export const TableUpdateContext = React.createContext();

export function useTableData() {
  return useContext(TableContext);
}

export function useTableDataUpdate() {
  return useContext(TableUpdateContext);
}

export function useAvailableTableColumns() {
  const tableData = useTableData();

  return tableColumnsFromData(tableData);
}

export function tableDataReducer(tableData, action) {
  let columnsFromData = tableColumnsFromData(mockData);

  switch (action.type) {
    case "updateSelectedColumns": {
      let { inputName: newInputName, inputValue: newInputValue } = action;
      let availableTableColumns = columnsFromData;
      let selectedTableColumns = defaultTableSettings.defaultColumns;
      let newSelectedTableColumns = selectedTableColumns;
      let selectedColumnsArray = selectedTableColumns.map(
        (input) => input.name
      );

      availableTableColumns.forEach((columnObject, availableColumnIndex) => {
        if (newInputName === columnObject.name) {
          let selectedColumnIndex = selectedColumnsArray.indexOf(newInputName);

          if (newInputValue) {
            columnObject.value = newInputValue;
            newSelectedTableColumns.splice(
              availableColumnIndex,
              0,
              columnObject
            );
          } else {
            columnObject.value = newInputValue;
            newSelectedTableColumns.splice(selectedColumnIndex, 1);
          }
        }
      });

      return newSelectedTableColumns;
    }
    case "sort": {
      const typeOfDataInColumnName = typeof tableData[0][action.columnName];

      let sortedData = [...tableData];
      let { highToLow, columnName, columnIndex } = { ...action };
      let selectedTableColumns = defaultTableSettings.defaultColumns;
      let newSortOrder = selectedTableColumns.map(() => false);

      newSortOrder[columnIndex] = highToLow;

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

      return sortedData;
    }
    case "filter": {
      let {
        primitive,
        value,
        greaterOrEqual,
        filterByColumn,
        filterTotalDataset = false,
      } = { ...action };

      let filteredData = [];
      let data = mockData;

      if (tableData.length && !filterTotalDataset) {
        data = tableData;
      }

      if (primitive === "number") {
        let attribute = filterByColumn.toLowerCase();

        data.forEach((record) => {
          let recordKeysArray = Object.keys(record);
          recordKeysArray.forEach((property) => {
            if (property === attribute) {
              if (greaterOrEqual) {
                if (record[attribute] >= value) {
                  filteredData.push(record);
                }
              } else {
                if (record[attribute] <= value) {
                  filteredData.push(record);
                }
              }
            }
          });
        });
      } else if (primitive === "string") {
        data.forEach((record) => {
          let newRecord = record;
          let sanitisedRecordArray = Object.values(newRecord);
          let inputInRecord = false;

          sanitisedRecordArray.forEach((property) => {
            if (typeof property === "string") {
              if (property.toLowerCase().includes(value.toLowerCase())) {
                inputInRecord = true;
              }
            }
          });

          if (inputInRecord) {
            filteredData.push(record);
          }
        });

        if (value === "") {
          filteredData = mockData;
        }
      }

      return filteredData;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export function TableDataProvider({ children }) {
  const [tableData, dispatch] = useReducer(tableDataReducer, mockData);

  return (
    <TableContext.Provider value={tableData}>
      <TableUpdateContext.Provider value={dispatch}>
        {children}
      </TableUpdateContext.Provider>
    </TableContext.Provider>
  );
}
