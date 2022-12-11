import React, { useState } from "react";
import { Radio } from "./radio";
import { Select } from "./select";
import { Form } from "./form";

export const SidePanel = (props) => {
  const {
    showSidePanel,
    toggleSidePanel,
    filterStringData,
    filterNumericData,
    selectedTableColumns,
    availableTableColumns,
  } = { ...props };
  const [radioChecked, setRadioChecked] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [columnToFilter, setColumnToFilter] = useState(null);
  const [isGreaterOrEqual, setIsGreaterOrEqual] = useState(1);
  const positionsArray = ["Goalkeeper", "Defence", "Midfield", "Forward"];
  const updateRadioButtonArray = (i) => {
    const newRadioButtonArrayValues = radioChecked.map((element, index) =>
      i === index ? true : false
    );
    setRadioChecked(newRadioButtonArrayValues);
    filterStringData(positionsArray[i], true);
  };
  const selectedTableColumnsArray = selectedTableColumns.map(
    (property) => property.name
  );
  const selectedNumericTableColumnsArray = [];
  const selectedTableColumnsTypes = [];
  selectedTableColumnsArray.forEach((columnName) => {
    availableTableColumns.forEach((availableColumn) => {
      if (availableColumn.name === columnName) {
        selectedTableColumnsTypes.push(availableColumn.type);
        if (availableColumn.type === "number") {
          selectedNumericTableColumnsArray.push(availableColumn.name);
          if (columnToFilter === null) {
            setColumnToFilter(columnName);
          }
        }
      }
    });
  });

  const filterByPosition = (
    <Radio
      inputNamesArray={positionsArray}
      inputValuesArray={radioChecked}
      updateRadioButtonArray={updateRadioButtonArray}
    />
  );

  const higherOrLower = (
    <div>
      <Select
        inputName={"Show records where:"}
        inputValuesArray={selectedNumericTableColumnsArray}
        setChosenOption={setColumnToFilter}
      />
      <select
        onChange={(e) => setIsGreaterOrEqual(Number.parseInt(e.target.value))}
      >
        <option value={1}>Higher Than or Equal to</option>
        <option value={0}>Lower Than or Equal to</option>
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
    <button
      className="button__action--secondary"
      onClick={() => filterStringData("")}
    >
      Clear Filter
    </button>
  );

  return (
    <div>
      {showSidePanel && (
        <div className="side-panel">
          <div className="side-panel__content">
            <h3 className="side-panel__header">Filter Table Data</h3>
            {filterByPosition}
            {higherOrLower}
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
