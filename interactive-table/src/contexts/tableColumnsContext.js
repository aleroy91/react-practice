import React, { useContext, useState } from "react";
import { defaultTableSettings } from "../data/defaultTableSettings";
import { setCharAt } from "../helper-functions/setCharAt";
import { useTableData } from "./tableDataContext";

const SelectedTableColumnsContext = React.createContext();
const SelectedTableColumnsUpdateContext = React.createContext();

export const useSelectedTableColumns = () => {
  return useContext(SelectedTableColumnsContext);
};

export const useSelectedTableColumnsUpdate = () => {
  return useContext(SelectedTableColumnsUpdateContext);
};

export const DisplaySelectedTableColumnsProvider = ({ children }) => {
  const data = useTableData();
  const [selectedTableColumns, setSelectedTableColumns] = useState(
    defaultTableSettings.defaultColumns
  );

  const updateSelectedColumns = (newInputName, newInputValue) => {
    const newSelectedTableColumns = selectedTableColumns;
    const selectedColumnsArray = selectedTableColumns.map(
      (input) => input.name
    );
    let availableTableColumns = defaultTableSettings.defaultColumns;

    if (data) {
      let tableColumnsFromData = [];

      Object.keys(data[0]).forEach((element) => {
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
            type: typeof data[0][element],
            value: false,
            property: element,
          });
        }
      });

      availableTableColumns = tableColumnsFromData;
    }

    availableTableColumns.forEach((columnObject, availableColumnIndex) => {
      if (newInputName === columnObject.name) {
        let selectedColumnIndex = selectedColumnsArray.indexOf(newInputName);
        if (newInputValue) {
          columnObject.value = newInputValue;
          newSelectedTableColumns.splice(availableColumnIndex, 0, columnObject);
        } else {
          columnObject.value = newInputValue;
          newSelectedTableColumns.splice(selectedColumnIndex, 1);
        }
      }
    });

    setSelectedTableColumns(newSelectedTableColumns);
  };

  return (
    <SelectedTableColumnsContext.Provider value={selectedTableColumns}>
      <SelectedTableColumnsUpdateContext.Provider value={updateSelectedColumns}>
        {children}
      </SelectedTableColumnsUpdateContext.Provider>
    </SelectedTableColumnsContext.Provider>
  );
};
