import React, { useState } from "react";
import { Radio } from "./radio";
import { Select } from "./select";
import { NumberPicker } from "./number-picker";
import {
  ExitButton,
  ActionButton,
  MultiInputContainer,
} from "./styled-components";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useSidePanel, useSidePanelUpdate } from "../contexts/sidePanelContext";
import { defaultTableSettings } from "../data/defaultTableSettings";
import { useAvailableTableColumns } from "../contexts/tableDataContext";

const CenteredHeader = styled.header`
  font-weight: 600;
  margin: 5px auto;
`;

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
  const updateTableData = props.updateTableData;
  const displaySidePanel = useSidePanel();
  const toggleSidePanel = useSidePanelUpdate();

  // Replace these two constants with data from context
  const selectedTableColumns = defaultTableSettings.defaultColumns;
  const availableTableColumns = useAvailableTableColumns();

  const [numberPickerInput, setNumberPickerInput] = useState(4);
  const defaultRadioSelection = [false, false, false, false];
  const [radioChecked, setRadioChecked] = useState(defaultRadioSelection);
  const [columnToFilter, setColumnToFilter] = useState(null);
  const [isGreaterOrEqual, setIsGreaterOrEqual] = useState(1);

  const positionsArray = ["Goalkeeper", "Defence", "Midfield", "Forward"];
  const selectedNumericTableColumnsArray = [];
  const selectedTableColumnsTypes = [];

  const updateRadioButtonArray = (i) => {
    const newRadioButtonArrayValues = radioChecked.map((element, index) =>
      i === index ? true : false
    );
    setRadioChecked(newRadioButtonArrayValues);
    updateTableData({
      type: "filter",
      primitive: "string",
      value: positionsArray[i],
      filterTotalDataset: true,
    });
  };

  const updateIsGreaterOrEqual = (inputValue) =>
    setIsGreaterOrEqual(Number.parseInt(inputValue));

  const updateNumericData = (inputValue) => {
    updateTableData({
      type: "filter",
      primitive: "number",
      filterByColumn: columnToFilter,
      value: inputValue,
      greaterOrEqual: isGreaterOrEqual,
      filterTotalDataset: false,
    });
    setNumberPickerInput(inputValue);
  };

  selectedTableColumns.forEach((column) => {
    availableTableColumns.forEach((availableColumn) => {
      if (availableColumn.name === column.name) {
        selectedTableColumnsTypes.push(availableColumn.type);
        if (availableColumn.type === "number") {
          selectedNumericTableColumnsArray.push(availableColumn.name);
          if (columnToFilter === null) {
            setColumnToFilter(column.name);
          }
        }
      }
    });
  });

  const clearFilters = () => {
    updateTableData({
      type: "filter",
      primitive: "string",
      value: "",
    });
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
    <>
      {displaySidePanel && (
        <SidePanelDiv>
          <SidePanelContentDiv>
            <SidePanelHeader>Filter Table Data</SidePanelHeader>
            {filterByPosition}
            {higherOrLower}
            {clearFilterButton}
          </SidePanelContentDiv>
          <ExitButton onClick={toggleSidePanel}>
            <CloseIcon />
          </ExitButton>
        </SidePanelDiv>
      )}
    </>
  );
};
