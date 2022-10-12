import { Form } from "./form";

export const Modal = (props) => {
  const { isDisplayed, recordData, selectedInputs, updateSelectedInputs } = {
    ...props,
  };
  const isDataAvailable = false; // Boolean(Object.values(recordData)[0]);

  const stringArrayToLowerCase = (arrayToConvert) => {
    let lowercaseArray = [];
    arrayToConvert.forEach((element) =>
      lowercaseArray.push(element.toLowerCase())
    );
    return lowercaseArray;
  };
  const lowercaseSelectedInputs = stringArrayToLowerCase(
    Object.values(selectedInputs)
  );

  const buildModalFormArray = (formObject) => {
    let formArray = Object.values(formObject);
    let modalFormArray = [];

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

  if (isDataAvailable) {
    columnSettingsArray = buildModalFormArray(recordData);
  } else {
    columnSettingsArray = buildModalFormArray(selectedInputs);
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
              updateSelectedInputs={updateSelectedInputs}
            />
          </div>
        </div>
      )}
    </div>
  );
};
