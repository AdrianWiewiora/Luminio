import { Link } from "react-router-dom";
import "./access.scss";

import RegistrationForm from "./registrationForm.tsx";
import Logo from "../../assets/img/logo.png";
import FormFooter from "../../components/footers/access/formFooter.tsx";
import AccessImg from "../../components/accessImg/accessImg.tsx";

function Registration() {
  return (
    <main className="access-container">
      <section className="access-container__content">
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            className="access-container__content--logo"
          />
        </Link>
        <RegistrationForm />
        <FormFooter link="/login" title="Zaloguj się" />
      </section>
      <AccessImg />
    </main>
  );
}

export default Registration;
