import { ControlledInput } from "./controlled-input";

export const Form = (props) => {
  const { name, formInputsArray, onInputChange } = { ...props };

  const formElementsFactory = formInputsArray.map((inputObject, index) => {
    const {
      name: inputName,
      options: inputOptions,
      type: inputType,
      value: inputValue,
      minimum: inputMinimum,
      maximum: inputMaximum,
    } = inputObject;

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
