import React, { useContext, useReducer } from "react";
import { mockData } from "../data/mockData";
import { defaultTableSettings } from "../data/defaultTableSettings";
import { setCharAt } from "../helper-functions/setCharAt";

export const TableContext = React.createContext();
export const TableUpdateContext = React.createContext();

export function useTableData() {
  return useContext(TableContext);
}

export function useTableDataUpdate() {
  return useContext(TableUpdateContext);
}

export function useSelectedTableColumns() {
  const tableData = useTableData();

  if (tableData.selectedTableColumns) {
    return tableData.selectedTableColumns;
  }

  return defaultTableSettings.defaultColumns;
}

export function useAvailableTableColumns() {
  let tableColumnsFromData = [];
  const tableData = useTableData();

  Object.keys(tableData[0]).forEach((element) => {
    if (element !== "photo" && element !== "gif") {
      let sanitisedColumnName = element;

      for (var i = 0; i < element.length; i++) {
        if (i === 0 || element[i - 1] === "_") {
          sanitisedColumnName = setCharAt(
            sanitisedColumnName,
            i,
            element.charAt(i).toUpperCase()
          );
        }

        if (element[i] === "_") {
          sanitisedColumnName = setCharAt(sanitisedColumnName, i, " ");
        }
      }

      tableColumnsFromData.push({
        name: sanitisedColumnName,
        type: typeof tableData[0][element],
        value: false,
        property: element,
      });
    }
  });

  return tableColumnsFromData;
}

export function tableDataReducer(tableData, action) {
  let tableColumnsFromData = [];

  Object.keys(mockData[0]).forEach((element) => {
    if (element !== "photo" && element !== "gif") {
      let sanitisedColumnName = element;

      for (var i = 0; i < element.length; i++) {
        if (i === 0 || element[i - 1] === "_") {
          sanitisedColumnName = setCharAt(
            sanitisedColumnName,
            i,
            element.charAt(i).toUpperCase()
          );
        }

        if (element[i] === "_") {
          sanitisedColumnName = setCharAt(sanitisedColumnName, i, " ");
        }
      }

      tableColumnsFromData.push({
        name: sanitisedColumnName,
        type: typeof mockData[0][element],
        value: false,
        property: element,
      });
    }
  });

  switch (action.type) {
    case "updateSelectedColumns": {
      let { inputName: newInputName, inputValue: newInputValue } = action;
      let availableTableColumns = tableColumnsFromData;
      let selectedTableColumns = tableData.selectedTableColumns
        ? tableData.selectedTableColumns
        : defaultTableSettings.defaultColumns;
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

      return { selectedTableColumns: newSelectedTableColumns };
    }
    case "sort": {
      const typeOfDataInColumnName = typeof tableData[0][action.columnName];

      let sortedData = [...tableData];
      let { highToLow, columnName, columnIndex } = { ...action };

      let selectedTableColumns = tableData.selectedTableColumns
        ? tableData.selectedTableColumns
        : defaultTableSettings.defaultColumns;

      let newSortOrder = tableData.sortOrder
        ? tableData.sortOrder
        : selectedTableColumns.map(() => false);

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
    // case "filter": {
    //   const filterNumericData = (
    //     recordAttribute,
    //     value,
    //     greaterOrEqual,
    //     useFullData
    //   ) => {
    //     let attribute = recordAttribute.toLowerCase();
    //     let filteredData = [];
    //     let dataToUse = useFullData ? data : recordData;

    //     dataToUse.forEach((record) => {
    //       let recordKeysArray = Object.keys(record);

    //       recordKeysArray.forEach((property) => {
    //         if (property === attribute) {
    //           if (greaterOrEqual) {
    //             if (record[attribute] >= value) {
    //               filteredData.push(record);
    //             }
    //           } else {
    //             if (record[attribute] <= value) {
    //               filteredData.push(record);
    //             }
    //           }
    //         }
    //       });
    //     });

    //     setRecordData(filteredData);
    //   };
    // }
    // case "filterString": {
    //   const filterStringData = (input, useFullData) => {
    //     let filteredData = [];
    //     let dataToUse = useFullData ? data : recordData;

    //     dataToUse.forEach((record) => {
    //       let newRecord = record;
    //       let sanitisedRecordArray = Object.values(newRecord);
    //       let inputInRecord = false;

    //       sanitisedRecordArray.forEach((property) => {
    //         if (typeof property === "string") {
    //           if (property.toLowerCase().includes(input.toLowerCase())) {
    //             inputInRecord = true;
    //           }
    //         }
    //       });

    //       if (inputInRecord) {
    //         filteredData.push(record);
    //       }
    //     });

    //     if (input === "") {
    //       setRecordData(data);
    //     } else {
    //       setRecordData(filteredData);
    //     }
    //   };
    // }
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
