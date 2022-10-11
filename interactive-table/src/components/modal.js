import { ControlledInput } from "./controlled-input";
import { Form } from "./form";

export const Modal = (props) => {
  const { isDisplayed, recordData, defaultColumns } = { ...props };
  const isDataAvailable = false; // Boolean(Object.values(recordData)[0]);
  let columnSettingsArray = [];

  const buildModalFormArray = (formObject) => {
    let formArray = Object.values(formObject);
    let modalFormArray = [];

    formArray.map((formInput) => {
      let formInputObject = {
        name: formInput,
        type: "checkbox",
      };

      modalFormArray.push(formInputObject);
    });

    return modalFormArray;
  };

  if (isDataAvailable) {
    columnSettingsArray = buildModalFormArray(recordData);
  } else {
    columnSettingsArray = buildModalFormArray(defaultColumns);
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
