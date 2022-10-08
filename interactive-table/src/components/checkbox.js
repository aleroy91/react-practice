export const Checkbox = props => {
    const name = props.name;

    return (
        <div>
            <input type="checkbox" />
            <label>{name}</label>
        </div>
    );
}