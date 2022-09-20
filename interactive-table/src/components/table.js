import React from 'react';
  
  export const Table = ({records, displayRecordCard, selectedRecordsArray}) => {
    const tableBody = records.map((record) => {
      let isRecordSelected = false;
      
      if (selectedRecordsArray.includes(record.number)) {
        isRecordSelected = true;
      }
  
      return <TableRow 
        key={record.number}
        record={record}
        number={record.number}
        isRecordSelected={isRecordSelected}
        onClick={() => displayRecordCard(record.number)} 
      />
    });
  
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="table__header">Players Table</th>
            <th></th>
            <th><span className="material-icons">more_vert</span></th>
          </tr>
          <tr>
            <th className="table__column-header">Name</th>
            <th className="table__column-header">Position</th>
            <th className="table__column-header">Price</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    );
  }

  const TableRow = ({ record, onClick, isRecordSelected }) => {
    let rowClass = "table__row";
  
    if (isRecordSelected) {
      rowClass = "table__row--selected";
    }
  
    return (
      <tr
        key={record.number}
        onClick={onClick}
        className={rowClass}
      >
        <td className="table__data-cell">{record.name}</td>
        <td className="table__data-cell">{record.position}</td>
        <td className="table__data-cell">{record.price}</td>
      </tr>
    ); 
  }