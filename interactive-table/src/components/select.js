import React from "react";

export const Select = (props) => {
  const { inputName, inputValuesArray, setChosenOption } = {
    ...props,
  };

  const selectOptions = inputValuesArray.map((inputValue, index) => {
    return (
      <option key={index + 1} value={inputValue}>
        {inputValue}
      </option>
    );
  });

  return (
    <div>
      <p>{inputName}</p>
      <select onChange={(e) => setChosenOption(e.target.value)}>
        {selectOptions}
      </select>
    </div>
  );
};
