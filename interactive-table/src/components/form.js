import { ControlledInput } from "./controlled-input";

export const Form = (props) => {
  const { name, formInputsArray } = { ...props };

  const formElementsFactory = formInputsArray.map((inputObject, index) => {
    let inputName = inputObject.name;
    let inputType = inputObject.type;

    return (
      <ControlledInput
        key={index}
        inputName={inputName}
        inputType={inputType}
      />
    );
  });

  return (
    <form>
      <fieldset>
        <legend>{name}</legend>
        {formElementsFactory}
        <input type="submit" value="Submit" />
      </fieldset>
    </form>
  );
};
