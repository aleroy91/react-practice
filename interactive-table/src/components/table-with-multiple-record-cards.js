import React, { useState } from "react";
import { RecordCardsArray } from "./record-cards";
import { Table } from "./table";
import { Modal } from "./modal";
import { Toolbar } from "./toolbar";
import { SidePanel } from "./side-panel";
import { BasicContainer } from "./styled-components";
import { DisplaySidePanelProvider } from "../contexts/sidePanelContext";
import { DisplayModalProvider } from "../contexts/modalContext";
import { useSelectedTableColumns } from "../contexts/tableColumnsContext";

export const TableWithMultipleRecordCards = ({ data }) => {
  const selectedTableColumns = useSelectedTableColumns();

  const [recordData, setRecordData] = useState(data);
  const [selectedRecordsArray, setSelectedRecordsArray] = useState([]);

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
          <Toolbar />
          <RecordCardsArray
            selectedRecordsArray={selectedRecordsArray}
            unfilteredRecordData={data}
            updateRecordInfo={updateRecordInfo}
            displayRecordCard={displayRecordCard}
          />
          <Modal />
          <Table
            selectedRecordsArray={selectedRecordsArray}
            records={recordData}
            displayRecordCard={displayRecordCard}
          />
          <SidePanel />
        </BasicContainer>
      </DisplayModalProvider>
    </DisplaySidePanelProvider>
  );
};
