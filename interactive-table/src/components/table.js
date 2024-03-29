import React, { useState } from "react";
import { FitContentButton, HorizontalContainer } from "./styled-components";
import styled from "styled-components";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useModalUpdate } from "../contexts/modalContext";
import { defaultTableSettings } from "../data/defaultTableSettings";

const SortButton = styled(FitContentButton)`
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
  background-color: #1c849b;
`;

const TableEditButton = styled(FitContentButton)`
  border-radius: 0 5px 5px 0;
  padding: 15px 10px 16px;
  margin: 21px auto auto 5px;
  color: white;
  background-color: #1c849b;
`;

const TableComponent = styled.table`
  margin: 20px auto auto;
  border: 1px lightgrey solid;
  border-spacing: 0;
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
    tableRecordData,
    updateTableData,
    selectedRecordsArray,
    displayRecordCard,
  } = {
    ...props,
  };
  const toggleModal = useModalUpdate();

  const selectedTableColumns = defaultTableSettings.defaultColumns;

  const defaultSortOrder = tableRecordData.map(() => false);
  const [sortOrderArray, setSortOrderArray] = useState(defaultSortOrder);

  const selectedCellValues = selectedTableColumns.map((tableColumnObject) => {
    return tableColumnObject.name.toLowerCase();
  });

  const updateSortOrderArray = (index) => {
    let newSortOrderArray = sortOrderArray.map((column, columnIndex) =>
      columnIndex === index ? !sortOrderArray[index] : sortOrderArray[index]
    );

    setSortOrderArray(newSortOrderArray);
  };

  const tableColumns = selectedTableColumns.map((columnObject, index) => {
    return (
      <TableColumnHeader key={index}>
        <HorizontalContainer>
          <h4>{columnObject.name}</h4>
          <SortButton
            onClick={() => {
              updateSortOrderArray(index);
              updateTableData({
                type: "sort",
                columnName: columnObject.property,
                columnIndex: index,
                highToLow: !sortOrderArray[index],
              });
            }}
          >
            {sortOrderArray[index] ? (
              <ArrowUpwardIcon />
            ) : (
              <ArrowDownwardIcon />
            )}
          </SortButton>
        </HorizontalContainer>
      </TableColumnHeader>
    );
  });

  const tableBody = tableRecordData.map((record) => {
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
    <HorizontalContainer>
      <TableComponent>
        <TableRowHeader>
          <tr>{tableColumns}</tr>
        </TableRowHeader>
        <tbody>{tableBody}</tbody>
      </TableComponent>
      <TableEditButton onClick={toggleModal}>
        <PlaylistAddIcon />
      </TableEditButton>
    </HorizontalContainer>
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
