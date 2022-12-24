import React from "react";
import { SearchBar } from "./search-bar";
import { FilterButton } from "./styled-components";

export const Toolbar = (props) => {
  const { filterStringData, toggleSidePanel } = { ...props };

  return (
    <div className="toolbar--margin-bottom">
      <div className="toolbar">
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
      </div>
    </div>
  );
};
