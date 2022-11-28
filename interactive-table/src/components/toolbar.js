import React from "react";
import { SearchBar } from "./search-bar";
// Also add an icon to display a filter side panel which will allow more complex filtering
// such as (by > than < than)
// By column (radio button multiple choice)
export const Toolbar = (props) => {
  const { filterData } = { ...props };

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
              <button className="button__filter">
                <span className="material-icons">tune</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
