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

  const stringArrayToLowerCase = (arrayToConvert) => {
    let lowercaseArray = [];
    arrayToConvert.forEach((element) =>
      lowercaseArray.push(element.toLowerCase())
    );
    return lowercaseArray;
  };
  const lowercaseAvailableInputs = stringArrayToLowerCase(
    Object.values(availableInputs)
  );
  const lowercaseSelectedInputs = stringArrayToLowerCase(
    Object.values(selectedInputs)
  );

  const buildModalFormArray = (formObject) => {
    let modalFormArray = [];
    let formArray = Object.values(formObject);

    formArray.map((formInput) => {
      let formInputObject = {
        name: formInput,
        type: "checkbox",
        value: lowercaseSelectedInputs.includes(formInput.toLowerCase()),
      };

      modalFormArray.push(formInputObject);
    });

    return modalFormArray;
  };

  let columnSettingsArray = [];

  columnSettingsArray = buildModalFormArray(lowercaseAvailableInputs);

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
