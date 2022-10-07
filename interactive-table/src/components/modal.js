export const Modal = props => {
    const {isDisplayed, recordData, defaultColumns} = {...props};
    const isDataAvailable = Boolean(Object.values(recordData)[0]);
    let columnSettings = Object.values(defaultColumns).map((property) => {
        return <p>{property}</p>;
    });

    if (isDataAvailable) {
        columnSettings = Object.keys(recordData[0]).map((property, index) => {
            if (property !== 'number' && property !== 'photo' && property !== 'gif') {
                return <p key={index}>{property}</p>;
            }
        });
    }

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