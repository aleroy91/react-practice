import React from "react";
import { Form } from "./form";

export const SidePanel = (props) => {
  const { showSidePanel, toggleSidePanel, filterStringData } = { ...props };

  const filterByPosition = (
    <div>
      <div className="radio" onChange={() => filterStringData("Goalkeeper")}>
        <label>
          <input type="radio" value="option1" />
          Goalkeeper
        </label>
      </div>
      <div className="radio" onChange={() => filterStringData("Defence")}>
        <label>
          <input type="radio" value="option2" />
          Defence
        </label>
      </div>
      <div className="radio" onChange={() => filterStringData("Midfield")}>
        <label>
          <input type="radio" value="option3" />
          Midfield
        </label>
      </div>
      <div className="radio" onChange={() => filterStringData("Forward")}>
        <label>
          <input type="radio" value="option4" />
          Forward
        </label>
      </div>
      <button onClick={() => filterStringData("")}>Clear Filter</button>
    </div>
  );

  return (
    <div>
      {showSidePanel && (
        <div className="side-panel">
          <div className="side-panel__content">
            <h3 className="side-panel__header">Filter Table Data</h3>
            <form>{filterByPosition}</form>
          </div>
          <button className="button__exit" onClick={() => toggleSidePanel()}>
            <span className="material-icons">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
