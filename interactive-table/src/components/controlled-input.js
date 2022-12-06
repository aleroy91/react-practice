import { Checkbox } from "./checkbox";
import { Radio } from "./radio";

export const ControlledInput = (props) => {
  const { inputName, inputType, inputValue, onInputChange } = {
    ...props,
  };

  const inputTypeFactory = (inputType) => {
    switch (inputType) {
      case "checkbox":
        return (
          <Checkbox
            inputName={inputName}
            inputValue={inputValue}
            onInputChange={onInputChange}
          />
        );
      case "radio":
        return (
          <Radio
            inputNamesArray={inputName}
            inputValuesArray={inputValue}
            onInputChange={onInputChange}
          />
        );
      default:
        return (
          <div>
            <input type={inputType} value={inputValue} />
            <label>{inputName}</label>
          </div>
        );
    }
  };

  return <div>{inputTypeFactory(inputType)}</div>;
};
