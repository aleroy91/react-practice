import React, { useContext, useState, useReducer } from "react";
import { mockData } from "../data/mockData";

export const TableContext = React.createContext();
export const TableUpdateContext = React.createContext();

export function useTableData() {
  return useContext(TableContext);
}

export function useTableDataUpdate() {
  return useContext(TableUpdateContext);
}

export function TableDataProvider({ children }) {
  const [tableData, setTableData] = useState(mockData);
  //   const [tableData, action] = useReducer(tableDataReducer, initialTableData);

  return (
    <TableContext.Provider value={tableData}>
      <TableUpdateContext.Provider value={setTableData}>
        {children}
      </TableUpdateContext.Provider>
    </TableContext.Provider>
  );
}

// function tableDataReducer(tableData, action) {
//   switch (action.type) {
//     case "sort": {
//       const typeOfDataInColumnName = typeof tableData[0][columnName];

//       let sortedData = [...tableData];
//       // Need to pass sortOrder as part of the action object
//       let newSortOrder = action.sortOrder;

//       newSortOrder[columnIndex] = highToLow;
//       // change this to be context instead of useState
//       setSortOrder(newSortOrder);

//       if (typeOfDataInColumnName === "number") {
//         sortedData.sort((a, b) => {
//           if (highToLow) {
//             return b[columnName] - a[columnName];
//           } else {
//             return a[columnName] - b[columnName];
//           }
//         });
//       } else if (typeOfDataInColumnName === "string") {
//         sortedData.sort((a, b) => {
//           const columnNameA = a[columnName].toUpperCase();
//           const columnNameB = b[columnName].toUpperCase();

//           if (highToLow) {
//             if (columnNameA < columnNameB) {
//               return -1;
//             }

//             if (columnNameA > columnNameB) {
//               return 1;
//             }
//           } else {
//             if (columnNameA > columnNameB) {
//               return -1;
//             }

//             if (columnNameA < columnNameB) {
//               return 1;
//             }
//           }

//           return 0;
//         });
//       } else {
//         console.error(
//           "A sort was not performed as the data provided was neither of type string nor type number"
//         );
//       }

//       return sortedData;
//     }
//     default: {
//       throw Error("Unknown action: " + action.type);
//     }
//   }
// }
