export const Modal = props => {
    const isDisplayed = props.isDisplayed;

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
                        <p>Modal Here</p>
                    </div>
                </div>
            }
        </div>
    );
}