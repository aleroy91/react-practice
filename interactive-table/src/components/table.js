import React from "react";
import { SortButton, TableEditButton } from "./styled-components";
import styled from "styled-components";

const TableComponent = styled.table`
  margin: 20px auto auto;
  border: 1px lightgrey solid;
  border-spacing: 0;
  border-radius: 0 0 10px 10px;
`;

const TableColumnHeader = styled.th`
  text-align: start;
  padding: 0.5rem;
`;

const TableRowHeader = styled.thead`
  background-color: #1c849b;
  color: white;
  border-bottom: #1c849b 1px solid;
`;

const TableRowElement = styled.tr`
  background-color: ${(props) => (props.primary ? "#b9d9eb" : "white")};

  :hover {
    background-color: ${(props) => (props.primary ? "#f08080" : "aliceblue")};
    cursor: pointer;
  }
`;

const TableDataCell = styled.td`
  padding: 0.5rem;
`;

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
      <TableColumnHeader key={index}>
        <div className="horizontal-container">
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
      </TableColumnHeader>
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
      <TableComponent>
        <TableRowHeader>
          <tr>{tableColumns}</tr>
        </TableRowHeader>
        <tbody>{tableBody}</tbody>
      </TableComponent>
      <TableEditButton onClick={() => displaySettings()}>
        <span className="material-icons">playlist_add</span>
      </TableEditButton>
    </div>
  );
};

const TableRow = ({ record, onClick, isRecordSelected, cellValues }) => {
  const tableCells = cellValues.map((valueName, index) => {
    return <TableDataCell key={index}>{record[valueName] || ""}</TableDataCell>;
  });

  if (isRecordSelected) {
    return (
      <TableRowElement primary key={record.id} onClick={onClick}>
        {tableCells}
      </TableRowElement>
    );
  } else {
    return (
      <TableRowElement key={record.id} onClick={onClick}>
        {tableCells}
      </TableRowElement>
    );
  }
};
