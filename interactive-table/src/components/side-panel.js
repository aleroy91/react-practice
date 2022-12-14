import React, { useState } from "react";
import { Radio } from "./radio";
import { Select } from "./select";
import { NumberPicker } from "./number-picker";

export const SidePanel = (props) => {
  const {
    showSidePanel,
    toggleSidePanel,
    filterStringData,
    filterNumericData,
    selectedTableColumns,
    availableTableColumns,
  } = { ...props };
  const defaultRadioSelection = [false, false, false, false];
  const [numberPickerInput, setNumberPickerInput] = useState(4);
  const [radioChecked, setRadioChecked] = useState(defaultRadioSelection);
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
  const updateIsGreaterOrEqual = (inputValue) =>
    setIsGreaterOrEqual(Number.parseInt(inputValue));
  const updateNumericData = (inputValue) => {
    filterNumericData(columnToFilter, inputValue, isGreaterOrEqual, false);
    setNumberPickerInput(inputValue);
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
  const clearFilters = () => {
    filterStringData("");
    setRadioChecked(defaultRadioSelection);
    setNumberPickerInput("");
  };

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
        selectNamesArray={selectedNumericTableColumnsArray}
        selectValuesArray={selectedNumericTableColumnsArray}
        setChosenOption={setColumnToFilter}
      />
      <Select
        selectNamesArray={["Higher Than or Equal to", "Lower Than or Equal to"]}
        selectValuesArray={[1, 0]}
        setChosenOption={updateIsGreaterOrEqual}
      />
      <NumberPicker
        inputValue={numberPickerInput}
        inputMin={4}
        inputMax={12}
        updateNumericData={updateNumericData}
      />
    </div>
  );
  const clearFilterButton = (
    <button
      className="button__action--secondary"
      onClick={() => clearFilters()}
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
