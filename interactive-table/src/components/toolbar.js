import React from "react";
import { SearchBar } from "./search-bar";

export const Toolbar = (props) => {
  const { filterData, toggleSidePanel } = { ...props };

  return (
    <div className="toolbar--margin-bottom">
      <div className="toolbar">
        <div className="horizontal-container">
          <div className="vertical-container">
            <div className="horizontal-container">
              <h1>Players Table</h1>
            </div>
            <div className="horizontal-container">
              <SearchBar filterData={filterData} />
              <button
                className="button__filter"
                onClick={() => toggleSidePanel()}
              >
                <span className="material-icons">tune</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
