import React from "react";
import { SortButton, TableEditButton } from "./styled-components";

export const Table = (props) => {
  const {
    selectedRecordsArray,
    records,
    displayRecordCard,
    displaySettings,
    selectedTableColumns,
    sortData,
    sortOrder,
  } = { ...props };

  const selectedCellValues = selectedTableColumns.map((tableColumnObject) => {
    return tableColumnObject.name.toLowerCase();
  });

  const tableColumns = selectedTableColumns.map((columnObject, index) => {
    return (
      <th className="table__column-header" key={index}>
        <div className="table__column-header--horizontal-group">
          <h4>{columnObject.name}</h4>
          <SortButton
            onClick={() => {
              sortData(columnObject.property, index, !sortOrder[index]);
            }}
          >
            {sortOrder[index] ? (
              <span className="material-icons">arrow_upward</span>
            ) : (
              <span className="material-icons">arrow_downward</span>
            )}
          </SortButton>
        </div>
      </th>
    );
  });

  const tableBody = records.map((record) => {
    let isRecordSelected = false;

    if (selectedRecordsArray.includes(record.id)) {
      isRecordSelected = true;
    }

    return (
      <TableRow
        key={record.id}
        record={record}
        cellValues={selectedCellValues}
        number={record.id}
        isRecordSelected={isRecordSelected}
        onClick={() => displayRecordCard(record.id)}
      />
    );
  });

  return (
    <div className="horizontal-container">
      <table className="table">
        <thead className="table__row-header">
          <tr>{tableColumns}</tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
      <TableEditButton onClick={() => displaySettings()}>
        <span className="material-icons">playlist_add</span>
      </TableEditButton>
    </div>
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
    <tr key={record.id} onClick={onClick} className={rowClass}>
      {tableCells}
    </tr>
  );
};
