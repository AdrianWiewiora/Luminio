import {Link} from "react-router-dom";
import './access.scss';

import LoginForm from "./loginForm";
import Logo from '../../assets/img/logo.png';
import FormFooter from "../../components/footers/access/formFooter";
import AccessImg from "../../components/accessImg/accessImg";

function LogIn(){
    return(
        <main className="access-container">
            <section className="access-container__content">
                <Link to="/">
                    <img src={Logo} alt="logo"/>
                </Link>
                <LoginForm />
                <FormFooter />
            </section>
            <AccessImg />
        </main>
    );
}

export default LogIn;