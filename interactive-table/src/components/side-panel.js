import React, { useState } from "react";
import { Form } from "./form";

export const SidePanel = (props) => {
  const { showSidePanel, toggleSidePanel, filterStringData } = { ...props };
  const [radioChecked, setRadioChecked] = useState([
    false,
    false,
    false,
    false,
  ]);

  const filterByPosition = (
    <div>
      <div
        className="radio"
        onChange={() => {
          filterStringData("Goalkeeper", true);
          setRadioChecked([true, false, false, false]);
        }}
      >
        <label>
          <input type="radio" value="option1" checked={radioChecked[0]} />
          Goalkeeper
        </label>
      </div>
      <div
        className="radio"
        onChange={() => {
          filterStringData("Defence", true);
          setRadioChecked([false, true, false, false]);
        }}
      >
        <label>
          <input type="radio" value="option2" checked={radioChecked[1]} />
          Defence
        </label>
      </div>
      <div
        className="radio"
        onChange={() => {
          filterStringData("Midfield", true);
          setRadioChecked([false, false, true, false]);
        }}
      >
        <label>
          <input type="radio" value="option3" checked={radioChecked[2]} />
          Midfield
        </label>
      </div>
      <div
        className="radio"
        onChange={() => {
          filterStringData("Forward", true);
          setRadioChecked([false, false, false, true]);
        }}
      >
        <label>
          <input type="radio" value="option4" checked={radioChecked[3]} />
          Forward
        </label>
      </div>
    </div>
  );
  const clearFilterButton = (
    <button onClick={() => filterStringData("")}>Clear Filter</button>
  );

  return (
    <div>
      {showSidePanel && (
        <div className="side-panel">
          <div className="side-panel__content">
            <h3 className="side-panel__header">Filter Table Data</h3>
            {filterByPosition}
            {clearFilterButton}
          </div>
          <button className="button__exit" onClick={() => toggleSidePanel()}>
            <span className="material-icons">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
