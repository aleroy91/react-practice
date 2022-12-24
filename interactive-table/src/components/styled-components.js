import styled from "styled-components";

export const ExitButton = styled.button`
  display: flex;
  width: fit-content;
  border: 1px;
  border-radius: 5px;
  padding: 2px;
  margin: 0 0 auto auto;
  background-color: crimson;
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const ActionButton = styled.button`
  width: 100%;
  border: 1px;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 30px auto;
  background-color: ${(props) => (props.primary ? "white" : "#1c849b")};
  color: ${(props) => (props.primary ? "#1c849b" : "white")};

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const SubmitButton = styled.button`
  width: fit-content;
  border: 1px;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px auto;
  background-color: darkgreen;
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const FilterButton = styled.button`
  width: fit-content;
  height: fit-content;
  border: 1px;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px 5px 5px 15px;
  color: #1c849b;
  background-color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const SortButton = styled.button`
  width: fit-content;
  border: 1px;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
  background-color: #1c849b;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const TableEditButton = styled.button`
  width: fit-content;
  height: fit-content;
  border: 1px;
  border-radius: 0 5px 5px 0;
  padding: 14px 10px;
  margin: 21px auto auto 5px;
  color: white;
  background-color: #1c849b;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
