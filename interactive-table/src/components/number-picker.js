import React from "react";
import {
  NumberPickerButton,
  NumberPickerArrow,
  FlexContainer,
  NumberPickerButtonsContainer,
  MultiInput,
} from "./styled-components";

export const NumberPicker = (props) => {
  const { inputValue, inputMin, inputMax, updateNumericData } = {
    ...props,
  };

  return (
    <FlexContainer>
      <MultiInput
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
