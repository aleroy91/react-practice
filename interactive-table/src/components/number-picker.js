import React from "react";

export const NumberPicker = (props) => {
  const { inputMin, inputMax, updateNumericData } = {
    ...props,
  };

  return (
    <input
      type="number"
      min={inputMin}
      max={inputMax}
      onChange={(e) => updateNumericData(e.target.value)}
    ></input>
  );
};
