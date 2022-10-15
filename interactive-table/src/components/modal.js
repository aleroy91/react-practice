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
    let modalFormArray = [];

    formArray.map((formInput) => {
      let formInputObject = {
        name: formInput,
        type: "checkbox",
        value: selectedInputs.includes(formInput),
      };

      modalFormArray.push(formInputObject);
    });

    return modalFormArray;
  };

  let columnSettingsArray = [];

  columnSettingsArray = buildModalFormArray(availableInputs);

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
              name="Select Column Settings"
              formInputsArray={columnSettingsArray}
              updateSelectedInputs={updateSelectedInputs}
            />
          </div>
        </div>
      )}
    </div>
  );
};
