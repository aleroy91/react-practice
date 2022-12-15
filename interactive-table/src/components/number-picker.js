import React from "react";

export const NumberPicker = (props) => {
  const { inputValue, inputMin, inputMax, updateNumericData } = {
    ...props,
  };

  return (
    <div className="number-picker">
      <input
        value={inputValue}
        type="number"
        min={inputMin}
        max={inputMax}
        onChange={(e) => updateNumericData(e.target.value)}
      />
      <span className="number-picker__buttons-container">
        <div>
          <div className="number-picker__buttons-container">
            <button
              className="button__number-picker"
              onClick={() => updateNumericData(Number.parseInt(inputValue) + 1)}
            >
              <div className="button__number-picker--arrow-up"></div>
            </button>
            <button
              className="button__number-picker"
              onClick={() => updateNumericData(Number.parseInt(inputValue) - 1)}
            >
              <div className="button__number-picker--arrow-down"></div>
            </button>
          </div>
        </div>
      </span>
    </div>
  );
};
