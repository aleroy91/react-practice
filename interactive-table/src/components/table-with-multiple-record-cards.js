import React, { useState } from "react";
import { RecordCardsArray } from "./record-cards";
import { Table } from "./table";
import { Modal } from "./modal";
import { Toolbar } from "./toolbar";
import { SidePanel } from "./side-panel";
import { BasicContainer } from "./styled-components";
import { DisplaySidePanelProvider } from "../contexts/sidePanelContext";
import { DisplayModalProvider } from "../contexts/modalContext";
import { tableDataReducer, useTableData } from "../contexts/tableDataContext";
import { useReducer } from "react";

export const TableWithMultipleRecordCards = ({ data }) => {
  const records = useTableData();
  const [tableRecordData, dispatch] = useReducer(tableDataReducer, records);

  const [recordData, setRecordData] = useState(data);
  const [selectedRecordsArray, setSelectedRecordsArray] = useState([]);

  const updateTableData = (params) => {
    dispatch({
      type: params.type,
      columnName: params.columnName,
      columnIndex: params.columnIndex,
      highToLow: params.highToLow,
      primitive: params.primitive,
      value: params.value,
      filterTotalDataset: params.filterTotalDataset,
      filterByColumn: params.filterByColumn,
      greaterOrEqual: params.greaterOrEqual,
    });
  };

  const updateRecordInfo = (recordId, recordNotes) => {
    recordData[recordId] = { ...recordData[recordId], notes: recordNotes };
    setRecordData(recordData);
  };

  const displayRecordCard = (recordId) => {
    let screenWidth = window.screen.width;
    let newCardsArrayWidth = 312 * (selectedRecordsArray.length + 1);
    let newSelectedRecordsArray = selectedRecordsArray;

    if (
      selectedRecordsArray.includes(recordId) &&
      selectedRecordsArray.length > 0
    ) {
      // If record id already selected, remove from selected records array
      let indexToRemove;

      selectedRecordsArray.forEach((element, index) => {
        if (element === recordId) {
          indexToRemove = index;
        }
      });

      if (indexToRemove === undefined) {
        console.error(
          `indexToRemove has not been set. The value of indexToRemove is ${indexToRemove}`
        );
      }

      newSelectedRecordsArray.splice(indexToRemove, 1);
    } else if (newCardsArrayWidth > screenWidth) {
      alert(
        "There is not enough screen space to display further record cards. Please remove one of the existing records if you would like to add another"
      );
      return;
    } else {
      // If record id not already selected, add to selected records array
      newSelectedRecordsArray.push(recordId);
    }
    setSelectedRecordsArray([...newSelectedRecordsArray]);
  };

  return (
    <DisplaySidePanelProvider>
      <DisplayModalProvider>
        <BasicContainer>
          <Toolbar updateTableData={updateTableData} />
          <RecordCardsArray
            selectedRecordsArray={selectedRecordsArray}
            unfilteredRecordData={data}
            updateRecordInfo={updateRecordInfo}
            displayRecordCard={displayRecordCard}
          />
          <Modal />
          <Table
            tableRecordData={tableRecordData}
            updateTableData={updateTableData}
            selectedRecordsArray={selectedRecordsArray}
            displayRecordCard={displayRecordCard}
          />
          <SidePanel updateTableData={updateTableData} />
        </BasicContainer>
      </DisplayModalProvider>
    </DisplaySidePanelProvider>
  );
};
