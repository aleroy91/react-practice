import React from "react";

export const Table = ({
  records,
  displayRecordCard,
  selectedRecordsArray,
  selectedTableColumns,
  displaySettings,
}) => {
  const selectedCellValues = selectedTableColumns.map((tableColumnObject) => {
    return tableColumnObject.name.toLowerCase();
  });

  const tableColumns = selectedTableColumns.map((columnObject, index) => {
    return (
      <th className="table__column-header" key={index}>
        <div className="table__column-header--horizontal-group">
          <h4>
            {columnObject.name}
          </h4>

          <button className="button__sort">
            <span className="material-icons">
              arrow_downward
            </span>
          </button>
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

  const tableHead = selectedTableColumns.map((element, index) => {
    if (index === 0) {
      return (
        <th className="table__header" key={index}>
          Players Table
        </th>
      );
    } else if (index === selectedTableColumns.length - 1) {
      return (
        <th key={index} className="table__column-header--justify-right">
          <button className="button__info" onClick={() => displaySettings()}>
            <span className="material-icons">more_vert</span>
          </button>
        </th>
      );
    } else {
      return <th key={index}></th>;
    }
  });

  return (
    <table className="table">
      {selectedTableColumns.length < 2 ? (
        <thead className="table__row-header">
          <tr className="table__column-header--justify-right">
            {tableHead}
            <button className="button__info" onClick={() => displaySettings()}>
              <span className="material-icons">more_vert</span>
            </button>
          </tr>
          <tr>
            {tableColumns}
            <th className="table__column-header" key={1}></th>
          </tr>
        </thead>
      ) : (
        <thead className="table__row-header">
          <tr>{tableHead}</tr>
          <tr>{tableColumns}</tr>
        </thead>
      )}
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
    <tr key={record.id} onClick={onClick} className={rowClass}>
      {tableCells}
    </tr>
  );
};
