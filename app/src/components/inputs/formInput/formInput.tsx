import "./formInput.scss";

type FormInputProps = {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean; 
};

function FormInput({ id, label, type, value, onChange, required = false }: FormInputProps) {
    return (
        <label htmlFor={id} className="form-label">
            {label}
            <input
                id={id}
                type={type}
                className="form-label__input"
                required={required} 
                value={value}
                onChange={onChange}
            />
        </label>
    );
}

export default FormInput;