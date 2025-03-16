import "./access.scss";
import Submit from "../../components/btn/submit/submit";
import FormInput from "../../components/inputs/formInput/formInput";

const loginForm = [
    { id: "email", label: "Email", type: "email" },
    { id: "password", label: "Password", type: "password" }
];

function LoginForm() {
    return (
        <form className="form">
            {loginForm.map(({ id, label, type }) => (
                <FormInput key={id} id={id} label={label} type={type} />
            ))}
            <Submit title="Zaloguj się" />
        </form>
    );
}

export default LoginForm;
