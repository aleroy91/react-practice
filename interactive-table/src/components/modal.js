import { Form } from "./form";
import { ExitButton } from "./styled-components";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useModal, useModalUpdate } from "../contexts/modalContext";
import {
  useAvailableTableColumns,
  useSelectedTableColumns,
  useTableDataUpdate,
} from "../contexts/tableDataContext";

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
  const availableInputs = useAvailableTableColumns();
  const displayModal = useModal();
  const toggleModal = useModalUpdate();
  const selectedInputs = useSelectedTableColumns();
  const updateSelectedInputs = useTableDataUpdate();

  let selectedInputNames = selectedInputs.map((input) => input.name);

  const buildModalFormArray = (formArray) => {
    return formArray.map((formInput) => {
      return {
        name: formInput.name,
        type: "checkbox",
        value: selectedInputNames.includes(formInput.name),
      };
    });
  };

  let columnSettingsArray = buildModalFormArray(availableInputs);

  return (
    <>
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
    </>
  );
};
