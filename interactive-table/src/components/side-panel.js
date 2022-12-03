import React, { useState } from "react";
import { Form } from "./form";

export const SidePanel = (props) => {
  const {
    showSidePanel,
    toggleSidePanel,
    filterStringData,
    filterNumericData,
    selectedTableColumns,
  } = { ...props };
  const [radioChecked, setRadioChecked] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [columnToFilter, setColumnToFilter] = useState([null]);
  const [isGreaterOrEqual, setIsGreaterOrEqual] = useState(true);
  const selectedTableColumnsArray = selectedTableColumns.map(
    (property) => property.name
  );

  const filterByPosition = (
    <div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="option1"
            checked={radioChecked[0]}
            onChange={() => {
              filterStringData("Goalkeeper", true);
              setRadioChecked([true, false, false, false]);
            }}
          />
          Goalkeeper
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="option2"
            checked={radioChecked[1]}
            onChange={() => {
              filterStringData("Defence", true);
              setRadioChecked([false, true, false, false]);
            }}
          />
          Defence
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="option3"
            checked={radioChecked[2]}
            onChange={() => {
              filterStringData("Midfield", true);
              setRadioChecked([false, false, true, false]);
            }}
          />
          Midfield
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="option4"
            checked={radioChecked[3]}
            onChange={() => {
              filterStringData("Forward", true);
              setRadioChecked([false, false, false, true]);
            }}
          />
          Forward
        </label>
      </div>
    </div>
  );
  const higherOrLower = (
    <div>
      <span>Show records where</span>
      <select onChange={(e) => setColumnToFilter(e.target.value)}>
        {selectedTableColumnsArray.map((column, i) => (
          <option key={i} value={column}>
            {column}
          </option>
        ))}
      </select>
      <select onChange={(e) => setIsGreaterOrEqual(e.target.value)}>
        <option value={true}>Higher Than or Equal to</option>
        <option value={false}>Lower Than or Equal to</option>
      </select>
      <input
        type="number"
        min="4"
        max="12"
        onChange={(e) =>
          filterNumericData(columnToFilter, e.target.value, isGreaterOrEqual)
        }
      ></input>
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
            {higherOrLower}
          </div>
          <button className="button__exit" onClick={() => toggleSidePanel()}>
            <span className="material-icons">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
