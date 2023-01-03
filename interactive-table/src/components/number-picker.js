import React from "react";
import { FlexContainer, MultiInput } from "./styled-components";
import styled from "styled-components";

const NumberPickerButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;

  ${FlexContainer} & {
    margin: auto -18px auto;
  }
`;

const NumberPickerButton = styled.button`
  background-color: white;
  border: 1px solid transparent;

  :hover {
    background-color: #1c849b;
    cursor: pointer;
  }

  ${(props) => {
    switch (props.$direction) {
      case "down":
        return `
          :hover {
            border-radius: 0 0 3px 0;
          }    
        `;
      default:
        return `
          :hover {
            border-radius: 0 3px 0 0;
          }
        `;
    }
  }}
`;

const NumberPickerArrow = styled.div`
  width: 0;
  height: 0;
  border-style: solid;

  ${(props) => {
    switch (props.$direction) {
      case "down":
        return `
          border-width: 6px 3px 0 3px;
          border-color: #1c849b transparent transparent transparent;

          ${NumberPickerButton}:hover && {
            border-color: white transparent transparent transparent;
          }
        `;
      default:
        return `
          border-width: 0 3px 6px 3px;
          border-color: transparent transparent #1c849b transparent;

          ${NumberPickerButton}:hover && {
            border-color: transparent transparent white transparent;
          }
        `;
    }
  }}
`;

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
