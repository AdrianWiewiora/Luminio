import "./checkbox.scss";

type CheckboxProps = {
    title: string;
};

function Checkbox({title}: CheckboxProps) {
    return(
        <div className="checkbox-group">
            <label className="checkbox-group__checkbox">
                <input type="checkbox" className="checkbox-group__checkbox--input"/>
                <span className="checkbox-group__checkbox--custom"></span>
                {title}
            </label>
        </div>
    );
}

export default Checkbox;