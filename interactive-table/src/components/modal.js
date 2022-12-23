import { Form } from "./form";
import { ExitButton } from "./styled-components";

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
            <ExitButton onClick={() => displaySettings()}>
              <span className="material-icons">close</span>
            </ExitButton>
            <Form
              name="Select Columns"
              formInputsArray={columnSettingsArray}
              onInputChange={updateSelectedInputs}
            />
          </div>
        </div>
      )}
    </div>
  );
};
