import React, { useState } from "react";
import { RecordCardsArray } from "./record-cards";
import { Table } from "./table";
import { Modal } from "./modal";
import { Toolbar } from "./toolbar";
import { SidePanel } from "./side-panel";

export const TableWithMultipleRecordCards = ({
  data,
  defaultTableSettings,
}) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [recordData, setRecordData] = useState(data);
  const [selectedRecordsArray, setSelectedRecordsArray] = useState([]);
  const [selectedTableColumns, setSelectedTableColumns] = useState(
    defaultTableSettings.defaultColumns
  );
  const [sortOrder, setSortOrder] = useState(
    selectedTableColumns.map(() => false)
  );

  let availableTableColumns = defaultTableSettings.defaultColumns;
  let selectedColumns = selectedTableColumns.map((input) => input.name);
  let setCharAt = (stringToModify, index, characterToModify) => {
    if (index > stringToModify.length - 1) {
      return stringToModify;
    } else {
      return (
        stringToModify.substring(0, index) +
        characterToModify +
        stringToModify.substring(index + 1)
      );
    }
  };

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

  const updateSelectedInputs = (newInputName, newInputValue) => {
    const newSelectedTableColumns = selectedTableColumns;
    const selectedColumnsArray = selectedTableColumns.map(
      (input) => input.name
    );

    availableTableColumns.forEach((columnObject, availableColumnIndex) => {
      if (newInputName === columnObject.name) {
        let selectedColumnIndex = selectedColumnsArray.indexOf(newInputName);
        if (newInputValue) {
          columnObject.value = newInputValue;
          newSelectedTableColumns.splice(availableColumnIndex, 0, columnObject);
        } else {
          columnObject.value = newInputValue;
          newSelectedTableColumns.splice(selectedColumnIndex, 1);
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

  const toggleSidePanel = () => {
    setShowSidePanel(!showSidePanel);
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
      delete newRecord.photo;
      delete newRecord.gif;

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

  const sortData = (columnName, columnIndex, highToLow) => {
    const typeOfDataInColumnName = typeof recordData[0][columnName];

    let sortedData = [...recordData];
    let newSortOrder = sortOrder;

    newSortOrder[columnIndex] = highToLow;
    setSortOrder(newSortOrder);

    if (typeOfDataInColumnName === "number") {
      sortedData.sort((a, b) => {
        if (highToLow) {
          return b[columnName] - a[columnName];
        } else {
          return a[columnName] - b[columnName];
        }
      });
    } else if (typeOfDataInColumnName === "string") {
      sortedData.sort((a, b) => {
        const columnNameA = a[columnName].toUpperCase();
        const columnNameB = b[columnName].toUpperCase();

        if (highToLow) {
          if (columnNameA < columnNameB) {
            return -1;
          }

          if (columnNameA > columnNameB) {
            return 1;
          }
        } else {
          if (columnNameA > columnNameB) {
            return -1;
          }

          if (columnNameA < columnNameB) {
            return 1;
          }
        }

        return 0;
      });
    } else {
      console.error(
        "A sort was not performed as the data provided was neither of type string nor type number"
      );
    }

    setRecordData(sortedData);
  };

  return (
    <div className="container">
      <Toolbar
        filterStringData={filterStringData}
        toggleSidePanel={toggleSidePanel}
      />
      <RecordCardsArray
        selectedRecordsArray={selectedRecordsArray}
        recordData={recordData}
        updateRecordInfo={updateRecordInfo}
        displayRecordCard={displayRecordCard}
      />
      <Modal
        isDisplayed={isDisplayed}
        selectedInputs={selectedColumns}
        availableInputs={availableTableColumns}
        updateSelectedInputs={updateSelectedInputs}
        displaySettings={displaySettings}
      />
      <Table
        selectedRecordsArray={selectedRecordsArray}
        records={recordData}
        displayRecordCard={displayRecordCard}
        displaySettings={displaySettings}
        selectedTableColumns={selectedTableColumns}
        sortData={sortData}
        sortOrder={sortOrder}
      />
      <SidePanel
        showSidePanel={showSidePanel}
        toggleSidePanel={toggleSidePanel}
        filterStringData={filterStringData}
        filterNumericData={filterNumericData}
        selectedTableColumns={selectedTableColumns}
        availableTableColumns={availableTableColumns}
      />
    </div>
  );
};
