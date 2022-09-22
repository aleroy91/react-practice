import React from 'react';
  
  export const Table = ({records, displayRecordCard, selectedRecordsArray, defaultTableSettings, displaySettings}) => {
    const tableColumns = defaultTableSettings.defaultColumns.map((columnName, index) => {
      return <th className="table__column-header" key={index}>{columnName}</th>;
    });
    
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
        <thead className="table__row-header">
          <tr>
            <th className="table__header">Players Table</th>
            <th></th>
            <th>
              <button 
                className="button__info"
                onClick={() => displaySettings()}
              >
                <span className="material-icons">more_vert</span>
              </button>
            </th>
          </tr>
          <tr>
            {tableColumns}
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