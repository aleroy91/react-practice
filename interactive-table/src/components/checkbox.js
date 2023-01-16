import React, { useReducer } from "react";
import {
  tableDataReducer,
  useSelectedTableColumns,
  useTableData,
} from "../contexts/tableDataContext";

export const Checkbox = (props) => {
  const { inputName } = {
    ...props,
  };

  const selectedColumns = useSelectedTableColumns();
  const [selected, dispatch] = useReducer(tableDataReducer, selectedColumns);

  let isSelected = false;
  selectedColumns.forEach((inputObject) => {
    if (inputObject.name === inputName) {
      isSelected = true;
    }
  });

  return (
    <div>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => {
          dispatch({
            type: "updateSelectedColumns",
            inputName: inputName,
            inputValue: !isSelected,
          });
        }}
      />
      <label>{inputName}</label>
    </div>
  );
};
