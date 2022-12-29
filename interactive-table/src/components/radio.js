import React from "react";
import { MultiInputContainer } from "./styled-components";

export const Radio = (props) => {
  const {
    inputName,
    inputNamesArray,
    inputValuesArray,
    updateRadioButtonArray,
    inputStyle,
  } = {
    ...props,
  };

  const radioButtonControl = inputNamesArray.map((inputName, index) => {
    return (
      <div className={inputStyle ? inputStyle : "radio"} key={index + 1}>
        <input
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
