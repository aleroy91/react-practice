import { ControlledInput } from './controlled-input';
import { Form } from './form';

export const Modal = props => {
    const {isDisplayed, recordData, defaultColumns} = {...props};
    const isDataAvailable = Boolean(Object.values(recordData)[0]);
    let columnSettingsObject = () => {
        let columnSettings = {};

        Object.values(defaultColumns).map((columnName) => {
            Object.assign(columnSettings, {columnName: 'checkbox'});
        });

        return columnSettings;
    }

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
                        <Form name='Select Column Settings' formElements={columnSettingsObject} />
                    </div>
                </div>
            }
        </div>
    );
}