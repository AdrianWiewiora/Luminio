import {Link} from "react-router-dom";
import "./formFooter.scss";
import SectionDivider from "../../../assets/svg/SectionDivider"

function FormFooter(){
    return(
        <footer className="form-footer">
            <SectionDivider />
            <div className="form-footer__links">
                    <Link to="">
                        Pomoc
                    </Link>
                    <Link to="/registration">
                        Zarejestruj się
                    </Link>
                </div>
        </footer>
    );
}

export default FormFooter;