import styled from "styled-components";

// Layout Elements

export const BasicContainer = styled.div`
  margin: auto;
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const NumberPickerButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;

  ${FlexContainer} & {
    margin: auto -18px auto;
  }
`;

export const MultiInputContainer = styled(FlexContainer)`
  color: white;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  padding: 0 0 20px;
  border-bottom: 1px white solid;
`;

// Background Elements

export const ModalBackground = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vw;
  opacity: 0.5;
  background-color: grey;
`;

// Header Elements

export const BoldHeader = styled.header`
  font-weight: 600;
`;

export const CenteredHeader = styled(BoldHeader)`
  margin: 5px auto;
`;

// Button Elements

export const Button = styled.button`
  border: 1px;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const NumberPickerButton = styled.button`
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

export const NumberPickerArrow = styled.div`
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

export const FlexButton = styled(Button)`
  display: flex;
`;

export const FitContentButton = styled(FlexButton)`
  width: fit-content;
  height: fit-content;
`;

export const ExitButton = styled(FitContentButton)`
  border-radius: 5px;
  padding: 2px;
  margin: 0 0 auto auto;
  background-color: crimson;
  color: white;
`;

export const ActionButton = styled(FitContentButton)`
  width: 100%;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 30px auto;
  background-color: ${(props) => (props.primary ? "white" : "#1c849b")};
  color: ${(props) => (props.primary ? "#1c849b" : "white")};
`;

export const SubmitButton = styled(FitContentButton)`
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px auto;
  background-color: darkgreen;
  color: white;
`;

export const FilterButton = styled(FitContentButton)`
  border-radius: 5px;
  padding: 6px 10px 7px;
  margin: 5px 5px 5px 15px;
  color: #1c849b;
  background-color: white;
`;

export const SortButton = styled(FitContentButton)`
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
  background-color: #1c849b;
`;

export const TableEditButton = styled(FitContentButton)`
  border-radius: 0 5px 5px 0;
  padding: 15px 10px 16px;
  margin: 21px auto auto 5px;
  color: white;
  background-color: #1c849b;
`;

// Input Elements

export const MultiInput = styled.input`
  margin: 2px 5px;
  border-radius: 4px;
  height: 25px;
  font-weight: 600;
  color: #1c849b;
  border-style: none;

  hover: {
    cursor: pointer;
  }
`;

export const RadioButton = styled.input`
  color: white;
  font-weight: 600;
`;
