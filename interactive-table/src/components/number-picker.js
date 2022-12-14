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
      <span className="arrows">
        <div className="arrows-component">
          <div className="arrows">
            <button
              onClick={() => updateNumericData(Number.parseInt(inputValue) + 1)}
            >
              <div className="arrow-top" />
            </button>
            <button
              onClick={() => updateNumericData(Number.parseInt(inputValue) - 1)}
            >
              <div className="arrow-bottom" />
            </button>
          </div>
        </div>
      </span>
    </div>
  );
};
