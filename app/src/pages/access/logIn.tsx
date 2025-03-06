import {Link} from "react-router-dom";
import './access.scss';

import LoginForm from "./loginForm";
import Logo from '../../assets/img/logo.png';
import FormFooter from "../../components/footers/access/formFooter";
import { logReg1, logReg2, logReg3, logReg4, logReg5, logReg6, logReg7, logReg8, logReg9 } from "../../assets/img/imgExport";

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
            <section className="access-container__carousel">
                <img src={logReg1} alt="photographer" className="access-container__carousel--img"/>
            </section>
        </main>
    );
}

export default LogIn;