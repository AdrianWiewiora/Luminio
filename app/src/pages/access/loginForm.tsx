import "./access.scss";
import Submit from "../../components/btn/submit/submit";

const loginForm = [
    { id: 1, label: "Email", type: "email" },
    { id: 2, label: "Password", type: "password" }
]

function LoginForm() {
  return (
    <form className="form" >
        {loginForm.map(({ id, label, type }) => (
            <label key={id} className="form__label">
                {label}
                <input type={type} className="form__label--input" required />
            </label>
        ))}
        <Submit title="Zaloguj się" />
    </form>
  );
}

export default LoginForm;
