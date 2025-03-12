import { Link } from 'react-router-dom';
import './access.scss';

import RegistrationForm from './registrationForm';
import Logo from "../../assets/img/logo.png";
import FormFooter from '../../components/footers/access/formFooter';
import AccessImg from "../../components/accessImg/accessImg";

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
            <AccessImg />
        </main>
    );
}

export default Registration;