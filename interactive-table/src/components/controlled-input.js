export const ControlledInput = props => {
    const [inputName, inputType] = {...props};

    const inputTypeFactory = inputType => {
        switch(inputType) {
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
            default:
                return (
                    <div>
                        <input type={inputType} />
                        <label>{inputName}</label>
                    </div>
                );
        }
    }

    return {inputTypeFactory};
}
