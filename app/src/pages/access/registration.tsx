import { Link } from 'react-router-dom';
import './access.scss';

import RegistrationForm from './registrationForm';
import Logo from "../../assets/img/logo.png";
import FormFooter from '../../components/footers/access/formFooter';
import { logReg1, logReg2, logReg3, logReg4, logReg5, logReg6, logReg7, logReg8, logReg9 } from "../../assets/img/imgExport";

function Registration(){
    return(
        <main className="access-container">
            <section className="access-container__content">
                <Link to="/">
                    <img src={Logo} alt="logo" className="access-container__content--img"/>
                </Link>
                <RegistrationForm />
                <FormFooter />
            </section>
            <section className="access-container__carousel">
                <img src={logReg2} alt="photographer" className="access-container__carousel--img"/>
            </section>
        </main>
    );
}

export default Registration;