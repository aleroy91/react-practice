import React, { useState } from "react";
import { RecordCardsArray } from "./record-cards";
import { Table } from "./table";
import { Modal } from "./modal";
import { SearchBar } from "./search-bar";

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
  let availableTableColumns = defaultTableSettings.defaultColumns;
  let selectedColumns = selectedTableColumns.map((input) => input.name);
  let setCharAt = (stringToModify, index, characterToModify) => {
    if (index > stringToModify.length-1) {
      return stringToModify;
    } else {
      return stringToModify.substring(0, index)
       + characterToModify
       + stringToModify.substring(index + 1);
    }
  }

  if (data) {
    let tableColumnsFromData = [];

    Object.keys(data[0]).forEach((element) => {
      if (element !== "photo" && element !== "gif") {
        let sanitisedColumnName = element;
        for (var i = 0; i < element.length; i++) {
          if (i === 0 || (element[i - 1] === "_")) {
            sanitisedColumnName = setCharAt(sanitisedColumnName, i, element.charAt(i).toUpperCase());
          }
          if (element[i] === "_") {
            sanitisedColumnName = setCharAt(sanitisedColumnName, i, " ");
          }
        }

        tableColumnsFromData.push({
          name: sanitisedColumnName,
          type: "checkbox",
          value: false,
        });
      }
    });

    availableTableColumns = tableColumnsFromData;
  }

  const updateSelectedInputs = (newInputName, newInputValue) => {
    const newSelectedTableColumns = selectedTableColumns;
    const selectedColumnsArray = selectedTableColumns.map((input) => input.name);
    
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

  const myDataToFilter = [
    {
        name: "Bruno Fernandes",
        position: "Midfield",
        price: 10         
    }, {
        name: "Cristiano Ronaldo",
        position: "Forward",
        price: 9.7
    }, {
        name: "Christian Eriksen",
        position: "Midfield",
        price: 6,
    }
  ];

  const filterData = (input, dataToFilter) => {
    let filteredData = [];

    dataToFilter.forEach((element) => {
        Object.values(element).filter(property => {
            if (typeof property === "string") {
              let lowercaseStringProperty = property.toLowerCase();
                if (lowercaseStringProperty.includes(input)) {
                    filteredData.push(element);
                }
            }
        });
    });
    console.log(filteredData);
    return filteredData;
  } 

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
        selectedInputs={selectedColumns}
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
      <SearchBar 
        filterData={filterData}
        data={myDataToFilter}
      />
    </div>
  );
};
