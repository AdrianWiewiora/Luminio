import "./access.scss";
import Submit from "../../components/btn/submit/submit";
import FormInput from "../../components/inputs/formInput/formInput";

const regiForm = [
    { id: "Email", label: "Email", type: "email" },
    { id: "Imię", label: "Imię", type: "text" },
    { id: "Nazwisko", label: "Nazwisko", type: "text" },
    { id: "Hasło", label: "Hasło", type: "password" },
    { id: "Potwórz Hasło", label: "otwórz Hasło", type: "password" }
  ];

function RegistrationForm() {
  return (
    <form className="form" >
        {regiForm.map(({ id, label, type }) => (
          <FormInput key={id} id={id} label={label} type={type} />
        ))}
        <Submit title="Zarejestruj się" />
    </form>
  );
}

export default RegistrationForm;
