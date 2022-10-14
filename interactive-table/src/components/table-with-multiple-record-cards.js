import React, { useState } from "react";
import { RecordCardsArray } from "./record-cards";
import { Table } from "./table";
import { Modal } from "./modal";

export const TableWithMultipleRecordCards = ({
  data,
  defaultTableSettings,
}) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [recordData, setRecordData] = useState(data);
  const [selectedRecordsArray, setSelectedRecordsArray] = useState([]);
  const [selectedTableColumns, setSelectedTableColumns] = useState(
    defaultTableSettings.defaultColumns
  );
  const availableTableColumns = (data) => {
    if (data) {
      let tableColumnsFromData = [];

      data[0].forEach((element) => {
        if (element !== "photo" && element !== "gif" && element !== "notes") {
          let capitalisedColumnName =
            element.charAt(0).toUpperCase() + element.slice(1);

          tableColumnsFromData.push({
            name: capitalisedColumnName,
            type: "checkbox",
            value: false,
          });
        }
      });

      return tableColumnsFromData;
    } else {
      return defaultTableSettings.defaultColumns;
    }
  };

  const updateSelectedInputs = (newInputName, newInputValue) => {
    const newInputNameLowercase = newInputName.toLowerCase();
    const newSelectedTableColumns = Object.values(selectedTableColumns);
    console.log(selectedTableColumns);

    availableTableColumns.forEach((columnName) => {
      const columnNameLowerCase = columnName.toLowerCase();

      if (newInputNameLowercase === columnNameLowerCase) {
        if (newInputValue) {
          newSelectedTableColumns.push(newInputNameLowercase);
        } else {
          const indexOfElementToRemove =
            newSelectedTableColumns.indexOf(columnName);
          newSelectedTableColumns.splice(indexOfElementToRemove, 1);
        }
      }
    });
    setSelectedTableColumns(newSelectedTableColumns);
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

  const displaySettings = () => {
    setIsDisplayed(!isDisplayed);
  };

  return (
    <div className="container">
      <RecordCardsArray
        selectedRecordsArray={selectedRecordsArray}
        recordData={recordData}
        updateRecordInfo={updateRecordInfo}
        displayRecordCard={displayRecordCard}
      />
      <Modal
        isDisplayed={isDisplayed}
        selectedInputs={selectedTableColumns}
        availableInputs={availableTableColumns}
        updateSelectedInputs={updateSelectedInputs}
        displaySettings={displaySettings}
      />
      <Table
        selectedRecordsArray={selectedRecordsArray}
        records={recordData}
        displayRecordCard={displayRecordCard}
        selectedTableColumns={selectedTableColumns}
        displaySettings={displaySettings}
      />
    </div>
  );
};
