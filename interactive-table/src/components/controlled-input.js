import { Checkbox } from "./checkbox";

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
