import React, { useState } from "react";

export const Radio = (props) => {
  const { inputNamesArray, inputValuesArray } = {
    ...props,
  };
  const [radioButtonArrayValues, setRadioButtonArrayValues] =
    useState(inputValuesArray);
  const updateRadioButtonArray = (i) => {
    const newRadioButtonArrayValues = radioButtonArrayValues.map(
      (element, index) => (i === index ? true : false)
    );
    setRadioButtonArrayValues(...newRadioButtonArrayValues);
  };

  const radioButtonControl = inputNamesArray.map((inputName, index) => {
    return (
      <div className="radio">
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

  return <div>{radioButtonControl}</div>;
};
