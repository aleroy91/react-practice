import { Form } from "./form";

export const Modal = (props) => {
  const {
    isDisplayed,
    selectedInputs,
    availableInputs,
    updateSelectedInputs,
    displaySettings,
  } = {
    ...props,
  };
  const buildModalFormArray = (formArray) => {
    return formArray.map((formInput) => {
      return {
        name: formInput.name,
        type: "checkbox",
        value: selectedInputs.includes(formInput.name),
      };
    });
  };

  let columnSettingsArray = buildModalFormArray(availableInputs);

  return (
    <div>
      {isDisplayed && (
        <div>
          <div className="modal-container"></div>
          <div className="modal">
            <button className="button__exit" onClick={() => displaySettings()}>
              <span className="material-icons">close</span>
            </button>
            <Form
              name="Select Columns"
              formInputsArray={columnSettingsArray}
              updateSelectedInputs={updateSelectedInputs}
            />
          </div>
        </div>
      )}
    </div>
  );
};
