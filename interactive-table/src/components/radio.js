import React from "react";
import { MultiInputContainer, RadioButton } from "./styled-components";

export const Radio = (props) => {
  const {
    inputName,
    inputNamesArray,
    inputValuesArray,
    updateRadioButtonArray,
  } = {
    ...props,
  };

  const radioButtonControl = inputNamesArray.map((inputName, index) => {
    return (
      <div key={index + 1}>
        <RadioButton
          type="radio"
          checked={inputValuesArray[index]}
          onChange={() => {
            updateRadioButtonArray(index);
          }}
        />
        <label>{inputName}</label>
      </div>
    );
  });

  return (
    <MultiInputContainer>
      <p>{inputName}</p>
      {radioButtonControl}
    </MultiInputContainer>
  );
};
