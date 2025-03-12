import { Link } from 'react-router-dom';
import './ctaButton.scss';

function CtaButton(){
    return(
        <Link to="/LogIn" className="cta-button">
            Zacznij już teraz
        </Link>
    );
}

export default CtaButton;