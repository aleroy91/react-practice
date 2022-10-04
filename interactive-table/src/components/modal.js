export const Modal = props => {
    const isDisplayed = props.isDisplayed;

    return (
        <div>
            {isDisplayed && 
                <div className="modal">
                    Modal Here
                </div>
            }
        </div>
    );
}