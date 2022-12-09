import React from "react";

export const Select = (props) => {
  const { inputName, inputValuesArray, setChosenOption } = {
    ...props,
  };

  const selectOptions = inputValuesArray.map((inputValue, index) => {
    return (
      <option key={index} value={inputValue}>
        {inputValue}
      </option>
    );
  });

  return (
    <div>
      <label>{inputName}</label>
      <select onChange={(e) => setChosenOption(e.target.value)}>
        {selectOptions}
      </select>
    </div>
  );
};
