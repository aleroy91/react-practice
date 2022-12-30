import React from "react";
import { MultiInput } from "./styled-components";

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
      <MultiInput as="select" onChange={(e) => setChosenOption(e.target.value)}>
        {selectOptions}
      </MultiInput>
    </div>
  );
};
