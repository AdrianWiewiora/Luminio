import "./formInput.scss";

type FormInputProps = {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormInput({ id, label, type, value, onChange }: FormInputProps) {
    return (
        <label htmlFor={id} className="form-label">
            {label}
            <input
                id={id}
                type={type}
                className="form-label__input"
                required
                value={value}
                onChange={onChange}
            />
        </label>
    );
}

export default FormInput;
