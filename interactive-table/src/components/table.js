import React from "react";

export const Table = ({
  records,
  displayRecordCard,
  selectedRecordsArray,
  selectedTableColumns,
  displaySettings,
}) => {
  const selectedCellValues = [];
  selectedTableColumns.map((tableColumnObject) => {
    let tableColumnName = tableColumnObject.name.toLowerCase();
    selectedCellValues.push(tableColumnName);
  });

  const tableColumns = selectedTableColumns.map((columnObject, index) => {
    return (
      <th className="table__column-header" key={index}>
        {columnObject.name}
      </th>
    );
  });

  const tableBody = records.map((record) => {
    let isRecordSelected = false;

    if (selectedRecordsArray.includes(record.number)) {
      isRecordSelected = true;
    }

    return (
      <TableRow
        key={record.number}
        record={record}
        cellValues={selectedCellValues}
        number={record.number}
        isRecordSelected={isRecordSelected}
        onClick={() => displayRecordCard(record.number)}
      />
    );
  });

  return (
    <table className="table">
      <thead className="table__row-header">
        <tr>
          <th className="table__header">Players Table</th>
          <th></th>
          <th>
            <button className="button__info" onClick={() => displaySettings()}>
              <span className="material-icons">more_vert</span>
            </button>
          </th>
        </tr>
        <tr>{tableColumns}</tr>
      </thead>
      <tbody>{tableBody}</tbody>
    </table>
  );
};

const TableRow = ({ record, onClick, isRecordSelected, cellValues }) => {
  let rowClass = "table__row";
  const tableCells = cellValues.map((valueName, index) => {
    return (
      <td className="table__data-cell" key={index}>
        {record[valueName] || ""}
      </td>
    );
  });

  if (isRecordSelected) {
    rowClass = "table__row--selected";
  }

  return (
    <tr key={record.number} onClick={onClick} className={rowClass}>
      {tableCells}
    </tr>
  );
};
