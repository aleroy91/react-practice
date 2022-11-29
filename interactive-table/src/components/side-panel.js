import React from "react";
import { Form } from "./form";

export const SidePanel = (props) => {
  const { showSidePanel, toggleSidePanel } = { ...props };

  return (
    <div>
      {showSidePanel && (
        <div className="side-panel">
          {/* <Form
          name="Select Columns"
          formInputsArray={columnSettingsArray}
          updateSelectedInputs={updateSelectedInputs}
          /> */}
          <div className="side-panel__content">
            <h3 className="side-panel__header">Filter Table Data</h3>
          </div>
          <button className="button__exit" onClick={() => toggleSidePanel()}>
            <span className="material-icons">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
