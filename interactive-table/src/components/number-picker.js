import React from "react";
import {
  NumberPickerButton,
  NumberPickerArrow,
  FlexContainer,
  NumberPickerButtonsContainer,
} from "./styled-components";

export const NumberPicker = (props) => {
  const { inputValue, inputMin, inputMax, updateNumericData } = {
    ...props,
  };

  return (
    <FlexContainer>
      <input
        className="multi-input-container__input"
        value={inputValue}
        type="number"
        min={inputMin}
        max={inputMax}
        onChange={(e) => updateNumericData(e.target.value)}
      />
      <NumberPickerButtonsContainer>
        <div>
          <NumberPickerButtonsContainer>
            <NumberPickerButton
              onClick={() => updateNumericData(Number.parseInt(inputValue) + 1)}
            >
              <NumberPickerArrow />
            </NumberPickerButton>
            <NumberPickerButton
              $direction="down"
              onClick={() => updateNumericData(Number.parseInt(inputValue) - 1)}
            >
              <NumberPickerArrow $direction="down" />
            </NumberPickerButton>
          </NumberPickerButtonsContainer>
        </div>
      </NumberPickerButtonsContainer>
    </FlexContainer>
  );
};
