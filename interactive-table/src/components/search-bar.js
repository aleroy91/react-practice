import React from "react";
import { HorizontalContainer } from "./styled-components";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const SearchBarInput = styled.input`
  border: 1px white solid;
  border-radius: 5px;
  font-family: "Roboto-Regular", sans-serif;
  margin-right: -30px;
  height: 33px;
  width: 250px;
  padding-left: 10px;

  :hover {
    opacity: 0.7;
  }
`;

export const SearchBar = (props) => {
  const { filterStringData } = { ...props };

  return (
    <HorizontalContainer>
      <SearchBarInput
        placeholder="Filter Records"
        onChange={(event) => {
          filterStringData(event.target.value);
        }}
      />
      <SearchIcon sx={{ color: "#1c849b", zIndex: 1 }} />
    </HorizontalContainer>
  );
};
