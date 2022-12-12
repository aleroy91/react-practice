import { ControlledInput } from "./controlled-input";

export const Form = (props) => {
  const { name, formInputsArray, onInputChange } = { ...props };

  const formElementsFactory = formInputsArray.map((inputObject, index) => {
    const inputName = inputObject.name;
    const inputOptions = inputObject.options;
    const inputType = inputObject.type;
    const inputValue = inputObject.value;
    const inputMinimum = inputObject.minimum;
    const inputMaximum = inputObject.maximum;

    return (
      <ControlledInput
        key={index}
        inputName={inputName}
        inputOptionsArray={inputOptions}
        inputType={inputType}
        inputValue={inputValue}
        inputMin={inputMinimum}
        inputMax={inputMaximum}
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
