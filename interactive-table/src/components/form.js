import { ControlledInput } from "./controlled-input";

export const Form = (props) => {
  const { name, formInputsArray, onInputChange } = { ...props };

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
        onInputChange={onInputChange}
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
