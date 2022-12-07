import React from "react";

export const Radio = (props) => {
  const { inputNamesArray, inputValuesArray, updateRadioButtonArray } = {
    ...props,
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
