import { Form } from "./form";
import { ExitButton, ModalBackground } from "./styled-components";
import styled from "styled-components";

const ModalDiv = styled.div`
  z-index: 9999;
  position: absolute;
  padding: 10px;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  width: fit-content;
  border-radius: 10px;
  background-color: white;
  border: solid 3px #1c849b;
`;

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
          <ModalBackground />
          <ModalDiv>
            <ExitButton onClick={() => displaySettings()}>
              <span className="material-icons">close</span>
            </ExitButton>
            <Form
              name="Select Columns"
              formInputsArray={columnSettingsArray}
              onInputChange={updateSelectedInputs}
            />
          </ModalDiv>
        </div>
      )}
    </div>
  );
};
