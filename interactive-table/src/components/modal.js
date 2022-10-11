import { ControlledInput } from "./controlled-input";
import { Form } from "./form";

export const Modal = (props) => {
  const { isDisplayed, recordData, defaultColumns } = { ...props };
  const isDataAvailable = Boolean(Object.values(recordData)[0]);
  let columnSettingsArray = [];

  if (isDataAvailable) {
    Object.keys(recordData[0]).map((property) => {
      if (property !== "number" && property !== "photo" && property !== "gif") {
        let columnNameObject = {
          name: property,
          type: "checkbox",
        };
        columnSettingsArray.push(columnNameObject);
      }
    });
  } else {
    Object.values(defaultColumns).map((columnName) => {
      let columnNameObject = {
        name: columnName,
        type: "checkbox",
      };
      columnSettingsArray.push(columnNameObject);
    });
  }

  return (
    <div>
      {isDisplayed && (
        <div>
          <div className="modal-container"></div>
          <div className="modal">
            <button
              className="button__exit"
              onClick={() => props.displaySettings()}
            >
              <span className="material-icons">close</span>
            </button>
            <Form
              name="Select Column Settings"
              formInputsArray={columnSettingsArray}
            />
          </div>
        </div>
      )}
    </div>
  );
};
