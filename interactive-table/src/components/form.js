import { ControlledInput } from "./controlled-input";

export const Form = (props) => {
  const { name, formInputsArray, updateSelectedInputs } = { ...props };

  const formElementsFactory = formInputsArray.map((inputObject, index) => {
    const inputName = inputObject.name;
    const inputType = inputObject.type;
    const inputValue = inputObject.value;

    return (
      <ControlledInput
        key={index}
        inputName={inputName}
        inputType={inputType}
        inputValue={inputValue}
        onInputChange={updateSelectedInputs}
      />
    );
  });

  return (
    <form>
      <fieldset>
        {name && <legend>{name}</legend>}
        {formElementsFactory}
      </fieldset>
    </form>
  );
};
