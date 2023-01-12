import React from "react";
import ReactDOM from "react-dom/client";
import { mockData } from "./data/mockData";
import { defaultTableSettings } from "./data/defaultTableSettings";
import { TableWithMultipleRecordCards } from "./components/table-with-multiple-record-cards";
import { DisplaySelectedTableColumnsProvider } from "./contexts/tableColumnsContext";
import { TableSortOrderProvider } from "./contexts/tableSortContext";
import { TableDataProvider } from "./contexts/tableDataContext";
import "./styles/main.css";
import "./assets/fonts/Roboto-Black.ttf";
import "./assets/fonts/Roboto-Regular.ttf";
import "./assets/fonts/Roboto-Light.ttf";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TableDataProvider>
    <DisplaySelectedTableColumnsProvider>
      <TableSortOrderProvider>
        <TableWithMultipleRecordCards
          data={mockData}
          defaultTableSettings={defaultTableSettings}
        />
      </TableSortOrderProvider>
    </DisplaySelectedTableColumnsProvider>
  </TableDataProvider>
);
