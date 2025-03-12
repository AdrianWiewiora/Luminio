import "./access.scss";
import Submit from "../../components/btn/submit/submit";

const regiFields = [
    { id: 1, label: "Email", type: "email" },
    { id: 2, label: "Imię", type: "text" },
    { id: 3, label: "Nazwisko", type: "text" },
    { id: 4, label: "Hasło", type: "password" },
    { id: 5, label: "Potwórz Hasło", type: "password" }
  ];

function RegistrationForm() {
  return (
    <form className="form" >
        {regiFields.map(({ id, label, type }) => (
            <label key={id} className="form__label">
                {label}
                <input type={type} className="form__label--input" required />
            </label>
        ))}
        <Submit title="Zarejestruj się" />
    </form>
  );
}

export default RegistrationForm;
