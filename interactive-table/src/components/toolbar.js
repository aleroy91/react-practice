import React from "react";
import { SearchBar } from "./search-bar";
import { FilterButton } from "./styled-components";
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

export const Toolbar = (props) => {
  const { filterStringData, toggleSidePanel } = { ...props };

  return (
    <ToolBarBottomSpacing>
      <ToolbarDiv>
        <div className="horizontal-container">
          <div className="vertical-container">
            <div className="horizontal-container">
              <h1>Players Table</h1>
            </div>
            <div className="horizontal-container">
              <SearchBar filterStringData={filterStringData} />
              <FilterButton onClick={() => toggleSidePanel()}>
                <span className="material-icons">tune</span>
              </FilterButton>
            </div>
          </div>
        </div>
      </ToolbarDiv>
    </ToolBarBottomSpacing>
  );
};
