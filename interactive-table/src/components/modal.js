import { Form } from "./form";
import { ExitButton } from "./styled-components";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useModal, useModalUpdate } from "../contexts/modalContext";

const ModalBackground = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vw;
  opacity: 0.5;
  background-color: grey;
`;

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
  const { selectedInputs, availableInputs, updateSelectedInputs } = {
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
  const displayModal = useModal();
  const toggleModal = useModalUpdate();

  return (
    <div>
      {displayModal && (
        <div>
          <ModalBackground />
          <ModalDiv>
            <ExitButton onClick={toggleModal}>
              <CloseIcon />
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
