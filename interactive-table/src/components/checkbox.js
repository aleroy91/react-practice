import React, { useState } from "react";

export const Checkbox = (props) => {
    const { inputName, inputValue, onInputChange } = {
        ...props,
      };
    const [checkboxValue, setCheckboxValue] = useState(inputValue);
    
    return (
        <div>
          <input
            type="checkbox"
            checked={checkboxValue}
            onChange={() => {
              onInputChange(inputName, !checkboxValue);
              setCheckboxValue(!checkboxValue);
            }}
          />
          <label>{inputName}</label>
        </div>
      );
}
