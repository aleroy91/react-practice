import React, { useState } from 'react';
import { RecordCardsArray } from './record-cards';
import { Table } from './table';

export const TableWithMultipleRecordCards = ({data, defaultTableSettings}) => {
    const [recordData, setRecordData] = useState(data);
    const [selectedRecordsArray, setSelectedRecordsArray] = useState([]);
  
    const updateRecordInfo = (recordId, recordNotes) => {
      recordData[recordId] = {...recordData[recordId], notes: recordNotes}
      setRecordData(recordData);
    };
    const displayRecordCard = (recordId) => {
      let screenWidth = window.screen.width;
      let newCardsArrayWidth = 312 * (selectedRecordsArray.length + 1);
      let newSelectedRecordsArray = selectedRecordsArray;

      if (selectedRecordsArray.includes(recordId) && (selectedRecordsArray.length > 0)) {
        // If record id already selected, remove from selected records array
        let indexToRemove;
        
        selectedRecordsArray.forEach((element, index) => {
          if (element === recordId) {
            indexToRemove = index;
          }
        });
        
        if (indexToRemove === undefined) {
          console.error(`indexToRemove has not been set. The value of indexToRemove is ${indexToRemove}`);
        }
        
        newSelectedRecordsArray.splice(indexToRemove, 1);
      } else if (newCardsArrayWidth > screenWidth) {
        alert("There is not enough screen space to display further record cards. Please remove one of the existing records if you would like to add another");
        return;
      } else {
        // If record id not already selected, add to selected records array
        newSelectedRecordsArray.push(recordId);
      }
      setSelectedRecordsArray([...newSelectedRecordsArray]);
    };
    const displaySettings = () => {
      console.log('display table settings');
    }
  
    return (
      <div className="container">
        <RecordCardsArray 
          selectedRecordsArray={selectedRecordsArray}
          recordData={recordData} 
          updateRecordInfo={updateRecordInfo} 
          displayRecordCard={displayRecordCard} 
        />
        <Table 
          selectedRecordsArray={selectedRecordsArray}
          records={recordData} 
          displayRecordCard={displayRecordCard}
          defaultTableSettings={defaultTableSettings}
          displaySettings={displaySettings} 
        />
      </div>
    );
  }