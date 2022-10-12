export const ControlledInput = (props) => {
  const { inputName, inputType, inputValue } = { ...props };

  const inputTypeFactory = (inputType) => {
    switch (inputType) {
      case "textarea":
        return (
          <div>
            <textarea></textarea>
            <label>{inputName}</label>
          </div>
        );
      case "select":
        return (
          <div>
            <select></select>
            <label>{inputName}</label>
          </div>
        );
      case "checkbox":
        return (
          <div>
            <input type="checkbox" checked={inputValue} />
            <label>{inputName}</label>
          </div>
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
