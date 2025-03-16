import "./formInput.scss";

type FormInputProps = {
    id: string;
    label: string;
    type: string;
};

function FormInput({ id, label, type }: FormInputProps) {
    return (
        <label htmlFor={id} className="form-label">
            {label}
            <input id={id} type={type} className="form-label__input" required />
        </label>
    );
}

export default FormInput;
