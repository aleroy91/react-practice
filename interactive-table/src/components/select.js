import React from "react";

export const Select = (props) => {
  const { inputName, selectNamesArray, selectValuesArray, setChosenOption } = {
    ...props,
  };

  const selectOptions = selectValuesArray.map((inputValue, index) => {
    return (
      <option key={index + 1} value={inputValue}>
        {selectNamesArray[index]}
      </option>
    );
  });

  return (
    <div>
      {inputName && <p>{inputName}</p>}
      <select
        className="multi-input-container__input"
        onChange={(e) => setChosenOption(e.target.value)}
      >
        {selectOptions}
      </select>
    </div>
  );
};
