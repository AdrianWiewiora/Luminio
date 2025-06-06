import {Link} from "react-router-dom";
import './access.scss';

import LoginForm from "./loginForm.tsx";
import Logo from '../../assets/img/logo.png';
import FormFooter from "../../components/footers/access/formFooter.tsx";
import AccessImg from "../../components/accessImg/accessImg.tsx";

function LogIn(){
    return(
        <main className="access-container">
            <section className="access-container__content">
                <Link to="/">
                    <img src={Logo} alt="logo" className="access-container__content--logo"/>
                </Link>
                <LoginForm />
                <FormFooter link="/registration" title="Zarejestruj się" />
            </section>
            <AccessImg />
        </main>
    );
}

export default LogIn;