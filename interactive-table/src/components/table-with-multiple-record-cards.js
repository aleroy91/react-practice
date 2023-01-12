import React, { useState } from "react";
import { RecordCardsArray } from "./record-cards";
import { Table } from "./table";
import { Modal } from "./modal";
import { Toolbar } from "./toolbar";
import { SidePanel } from "./side-panel";
import { BasicContainer } from "./styled-components";
import { DisplaySidePanelProvider } from "../contexts/sidePanelContext";
import { DisplayModalProvider } from "../contexts/modalContext";
import { setCharAt } from "../helper-functions/setCharAt";
import { useSelectedTableColumns } from "../contexts/tableColumnsContext";

export const TableWithMultipleRecordCards = ({
  data,
  defaultTableSettings,
}) => {
  const selectedTableColumns = useSelectedTableColumns();

  const [recordData, setRecordData] = useState(data);
  const [selectedRecordsArray, setSelectedRecordsArray] = useState([]);

  let availableTableColumns = defaultTableSettings.defaultColumns;

  if (data) {
    let tableColumnsFromData = [];

    Object.keys(data[0]).forEach((element) => {
      if (element !== "photo" && element !== "gif") {
        let sanitisedColumnName = element;

        for (var i = 0; i < element.length; i++) {
          if (i === 0 || element[i - 1] === "_") {
            sanitisedColumnName = setCharAt(
              sanitisedColumnName,
              i,
              element.charAt(i).toUpperCase()
            );
          }

          if (element[i] === "_") {
            sanitisedColumnName = setCharAt(sanitisedColumnName, i, " ");
          }
        }

        tableColumnsFromData.push({
          name: sanitisedColumnName,
          type: typeof data[0][element],
          value: false,
          property: element,
        });
      }
    });

    availableTableColumns = tableColumnsFromData;
  }

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

  const filterNumericData = (
    recordAttribute,
    value,
    greaterOrEqual,
    useFullData
  ) => {
    let attribute = recordAttribute.toLowerCase();
    let filteredData = [];
    let dataToUse = useFullData ? data : recordData;

    dataToUse.forEach((record) => {
      let recordKeysArray = Object.keys(record);

      recordKeysArray.forEach((property) => {
        if (property === attribute) {
          if (greaterOrEqual) {
            if (record[attribute] >= value) {
              filteredData.push(record);
            }
          } else {
            if (record[attribute] <= value) {
              filteredData.push(record);
            }
          }
        }
      });
    });

    setRecordData(filteredData);
  };

  const filterStringData = (input, useFullData) => {
    let filteredData = [];
    let dataToUse = useFullData ? data : recordData;

    dataToUse.forEach((record) => {
      let newRecord = record;
      let sanitisedRecordArray = Object.values(newRecord);
      let inputInRecord = false;

      sanitisedRecordArray.forEach((property) => {
        if (typeof property === "string") {
          if (property.toLowerCase().includes(input.toLowerCase())) {
            inputInRecord = true;
          }
        }
      });

      if (inputInRecord) {
        filteredData.push(record);
      }
    });

    if (input === "") {
      setRecordData(data);
    } else {
      setRecordData(filteredData);
    }
  };

  return (
    <DisplaySidePanelProvider>
      <DisplayModalProvider>
        <BasicContainer>
          <Toolbar filterStringData={filterStringData} />
          <RecordCardsArray
            selectedRecordsArray={selectedRecordsArray}
            unfilteredRecordData={data}
            updateRecordInfo={updateRecordInfo}
            displayRecordCard={displayRecordCard}
          />
          <Modal availableInputs={availableTableColumns} />
          <Table
            selectedRecordsArray={selectedRecordsArray}
            records={recordData}
            displayRecordCard={displayRecordCard}
            selectedTableColumns={selectedTableColumns}
          />
          <SidePanel
            filterStringData={filterStringData}
            filterNumericData={filterNumericData}
            selectedTableColumns={selectedTableColumns}
            availableTableColumns={availableTableColumns}
          />
        </BasicContainer>
      </DisplayModalProvider>
    </DisplaySidePanelProvider>
  );
};
