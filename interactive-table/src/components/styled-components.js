import styled from "styled-components";

export const BoldHeader = styled.header`
  font-weight: 600;
`;

export const CenteredHeader = styled(BoldHeader)`
  margin: 5px auto;
`;

export const Button = styled.button`
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

export const FilterButton = styled(FitContentButton)`
  border-radius: 5px;
  padding: 5px 10px;
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
  padding: 14px 10px;
  margin: 21px auto auto 5px;
  color: white;
  background-color: #1c849b;
`;
