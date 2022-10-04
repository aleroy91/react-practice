export const Modal = props => {
    const isDisplayed = props.isDisplayed;

    return (
        <div>
            {isDisplayed && <p>Put Modal Here</p>}
        </div>
    );
}