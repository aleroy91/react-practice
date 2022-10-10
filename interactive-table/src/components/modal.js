import { ControlledInput } from './controlled-input';

export const Modal = props => {
    const {isDisplayed, recordData, defaultColumns} = {...props};
    const isDataAvailable = Boolean(Object.values(recordData)[0]);
    let columnSettings = Object.values(defaultColumns).map((columnName) => {
        return <ControlledInput inputName={columnName} inputType='checkbox' />;
    });

    // if (isDataAvailable) {
    //     columnSettings = Object.keys(recordData[0]).map((property, index) => {
    //         if (property !== 'number' && property !== 'photo' && property !== 'gif') {
    //             return <Checkbox key={index} name={property} />;
    //         }
    //     });
    // }

    return (
        <div>
            {isDisplayed && 
                <div>
                    <div className="modal-container"></div>
                    <div className="modal">
                        <button 
                            className="button__exit"
                            onClick={() => props.displaySettings()}
                        >
                            <span className="material-icons">
                                close
                            </span>
                        </button>
                        {columnSettings}
                    </div>
                </div>
            }
        </div>
    );
}