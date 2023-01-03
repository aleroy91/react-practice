import React from "react";
import { SearchBar } from "./search-bar";
import {
  FitContentButton,
  HorizontalContainer,
  VerticalContainer,
} from "./styled-components";
import styled from "styled-components";

const ToolbarDiv = styled.div`
  text-align: start;
  font-size: 1.5em;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #1c849b;
  color: white;
`;

const ToolBarBottomSpacing = styled.div`
  margin-bottom: 200px;
`;

const FilterButton = styled(FitContentButton)`
  border-radius: 5px;
  padding: 6px 10px 7px;
  margin: 5px 5px 5px 15px;
  color: #1c849b;
  background-color: white;
`;

export const Toolbar = (props) => {
  const { filterStringData, toggleSidePanel } = { ...props };

  return (
    <ToolBarBottomSpacing>
      <ToolbarDiv>
        <HorizontalContainer>
          <VerticalContainer>
            <HorizontalContainer>
              <h1>Players Table</h1>
            </HorizontalContainer>
            <HorizontalContainer>
              <SearchBar filterStringData={filterStringData} />
              <FilterButton onClick={() => toggleSidePanel()}>
                <span className="material-icons">tune</span>
              </FilterButton>
            </HorizontalContainer>
          </VerticalContainer>
        </HorizontalContainer>
      </ToolbarDiv>
    </ToolBarBottomSpacing>
  );
};
