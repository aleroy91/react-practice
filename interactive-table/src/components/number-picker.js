import React from "react";
import {
  NumberPickerButton,
  NumberPickerArrowUp,
  NumberPickerArrowDown,
} from "./styled-components";

export const NumberPicker = (props) => {
  const { inputValue, inputMin, inputMax, updateNumericData } = {
    ...props,
  };

  return (
    <div className="number-picker">
      <input
        className="multi-input-container__input"
        value={inputValue}
        type="number"
        min={inputMin}
        max={inputMax}
        onChange={(e) => updateNumericData(e.target.value)}
      />
      <span className="number-picker__buttons-container">
        <div>
          <div className="number-picker__buttons-container">
            <NumberPickerButton
              onClick={() => updateNumericData(Number.parseInt(inputValue) + 1)}
            >
              <NumberPickerArrowUp />
            </NumberPickerButton>
            <NumberPickerButton
              onClick={() => updateNumericData(Number.parseInt(inputValue) - 1)}
            >
              <NumberPickerArrowDown />
            </NumberPickerButton>
          </div>
        </div>
      </span>
    </div>
  );
};
