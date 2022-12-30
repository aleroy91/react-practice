import React, { useState } from "react";
import { Radio } from "./radio";
import { Select } from "./select";
import { NumberPicker } from "./number-picker";
import {
  ExitButton,
  ActionButton,
  CenteredHeader,
  MultiInputContainer,
} from "./styled-components";
import styled from "styled-components";

const SidePanelDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 20px;
  box-shadow: 1px 1px 10px 0 black;
  width: fit-content;
  background-color: #1c849b;
  display: flex;
`;

const SidePanelHeader = styled.h3`
  color: white;
  margin: 0;
  padding: 0 0 20px 0;
  border-bottom: 1px solid white;
`;

const SidePanelContentDiv = styled.div`
  align-self: flex-start;
  margin: 40px 20px;
  display: flex;
  flex-direction: column;
`;

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
    setNumberPickerInput(4);
  };

  const filterByPosition = (
    <Radio
      inputName={"Position:"}
      inputNamesArray={positionsArray}
      inputValuesArray={radioChecked}
      updateRadioButtonArray={updateRadioButtonArray}
    />
  );

  const higherOrLower = (
    <MultiInputContainer>
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
    </MultiInputContainer>
  );
  const clearFilterButton = (
    <ActionButton primary onClick={() => clearFilters()}>
      <CenteredHeader>Clear Filter</CenteredHeader>
    </ActionButton>
  );

  return (
    <div>
      {showSidePanel && (
        <SidePanelDiv>
          <SidePanelContentDiv>
            <SidePanelHeader>Filter Table Data</SidePanelHeader>
            {filterByPosition}
            {higherOrLower}
            {clearFilterButton}
          </SidePanelContentDiv>
          <ExitButton onClick={() => toggleSidePanel()}>
            <span className="material-icons">close</span>
          </ExitButton>
        </SidePanelDiv>
      )}
    </div>
  );
};
