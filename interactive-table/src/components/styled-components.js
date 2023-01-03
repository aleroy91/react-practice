import styled from "styled-components";

// Layout Elements

export const BasicContainer = styled.div`
  margin: auto;
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const ColumnContainer = styled(FlexContainer)`
  flex-direction: column;
`;

export const HorizontalContainer = styled(FlexContainer)`
  flex-direction: row;
  width: fit-content;
  align-items: center;
  justify-items: center;
  margin: auto;
`;

export const VerticalContainer = styled(ColumnContainer)`
  text-align: center;
  padding: 10px 20px;
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

// Button Elements

const Button = styled.button`
  border: 1px;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
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
