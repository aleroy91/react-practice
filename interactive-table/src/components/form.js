import { ControlledInput } from './controlled-input';

export const Form = props => {
    const {name, formElements} = {...props};
    const formElementsArray = Object.entries(formElements);
    
    const formElementsFactory = () => {
        for (const [formElementName, formElementType] of formElementsArray) {
            return (
                <ControlledInput 
                    key={formElementsArray.indexOf(formElementName)} 
                    inputName={formElementName} 
                    inputType={formElementType}
                />
            );
        }
    };

    return (
        <form>
            <fieldset>
                <legend>{name}</legend>
                {formElementsFactory()}
                <input type="submit" value="Submit" />
            </fieldset>
        </form>
    );
}