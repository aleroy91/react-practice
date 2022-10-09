import { Input } from './input';

export const Form = props => {
    const [name, formElements] = {...props};
    const formElementsArray = Object.entries(formElements);

    const formElementsFactory = () => {
        for (const [formElementName, formElementType] of formElementsArray) {
            return (
                <Input 
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
                {formElementsFactory}
            </fieldset>
        </form>
    );
}