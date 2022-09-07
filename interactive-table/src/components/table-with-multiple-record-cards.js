import React, { useState } from 'react';
import { RecordCardsArray } from './record-cards';
import { Table } from './table';

export const TableWithMultipleRecordCards = ({data}) => {
    const [recordData, setRecordData] = useState(data);
    const [selectedRecordsArray, setSelectedRecordsArray] = useState([]);
  
    const updateRecordInfo = (recordId, recordNotes) => {
      recordData[recordId] = {...recordData[recordId], notes: recordNotes}
      setRecordData(recordData);
    };
    const displayRecordCard = (recordId) => {
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
      } else {
        // If record id not already selected, add to selected records array
        newSelectedRecordsArray.push(recordId);
      }
      setSelectedRecordsArray([...newSelectedRecordsArray]);
    };
  
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
        />
      </div>
    );
  }