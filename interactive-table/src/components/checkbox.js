import React, { useState, useReducer } from "react";
import { tableDataReducer, useTableData } from "../contexts/tableDataContext";

export const Checkbox = (props) => {
  const { inputName, inputValue, onInputChange } = {
    ...props,
  };

  const records = useTableData();

  const [checkboxValue, setCheckboxValue] = useState(inputValue);
  const [selected, dispatch] = useReducer(tableDataReducer, records);

  return (
    <div>
      <input
        type="checkbox"
        checked={checkboxValue}
        onChange={() => {
          dispatch({
            inputName: inputName,
            inputValue: !checkboxValue,
          });
          setCheckboxValue(!checkboxValue);
        }}
      />
      <label>{inputName}</label>
    </div>
  );
};
