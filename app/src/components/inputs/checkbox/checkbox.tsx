import "./checkbox.scss";

type CheckboxProps = {
    title: string;
    checked?: boolean;
    onChange?: (isChecked: boolean) => void;
};

function Checkbox({ title, checked = false, onChange }: CheckboxProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.checked);
        }
    };

    return (
        <div className="checkbox-group">
            <label className="checkbox-group__checkbox">
                <input 
                    type="checkbox" 
                    className="checkbox-group__checkbox--input"
                    checked={checked}
                    onChange={handleChange}
                />
                <span className="checkbox-group__checkbox--custom"></span>
                {title}
            </label>
        </div>
    );
}

export default Checkbox;