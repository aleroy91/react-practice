import { Checkbox } from "./checkbox";
import { Radio } from "./radio";
import { Select } from "./select";
import { NumberPicker } from "./number-picker";

export const ControlledInput = (props) => {
  const {
    inputName,
    inputOptionsArray,
    inputType,
    inputValue,
    inputMin,
    inputMax,
    onInputChange,
  } = {
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
            inputNamesArray={inputOptionsArray}
            inputValuesArray={inputValue}
            onInputChange={onInputChange}
          />
        );
      case "select":
        return (
          <Select
            inputName={inputName}
            selectNamesArray={inputOptionsArray}
            selectValuesArray={inputValue}
            setChosenOption={onInputChange}
          />
        );
      case "number":
        return (
          <NumberPicker
            inputMin={inputMin}
            inputMax={inputMax}
            updateNumericData={onInputChange}
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
