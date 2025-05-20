import "./footer.scss";
import { Link } from "react-router-dom";
import { TiSocialInstagram, TiSocialLinkedin } from "react-icons/ti";

import Logo from '../../../assets/img/logo.png';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__container--about">
                    <Link to="/">
                        <img src={Logo} alt="logo" className="header__nav-container--logo"/>
                    </Link>
                    <p>
                        Nasza aplikacja łączy fotografów z osobami poszukującymi profesjonalnych usług,
                         ułatwiając znalezienie idealnego twórcy na każdą okazję. Dzięki interaktywnym
                          galeriom zdjęć możesz odkrywać inspirujące portfolio, porównywać oferty 
                          i rezerwować sesje w prosty i intuicyjny sposób.
                    </p>
                </div>
                <div className="footer__container--links">
                    <Link to="/gallery" className="footer__container--links--text">
                        Eksploruj
                    </Link>
                    <Link to="/gallery" className="footer__container--links--text">
                        Zdjęcia
                    </Link>
                    <Link to="/gallery" className="footer__container--links--text">
                        Albumy
                    </Link>
                    <Link to="/gallery" className="footer__container--links--text">
                        Twórcy
                    </Link>
                </div>
                <div className="footer__container--links">
                    <Link to="/gallery" className="footer__container--links--text">
                        Wyszukaj twórce
                    </Link>
                    <Link to="/" className="footer__container--links--text">
                        Losuj
                    </Link>
                    <Link to="/" className="footer__container--links--text">
                        FAQ
                    </Link>
                </div>
            </div>
            <div className="footer__socials">
                <a href="https://linkedin.com" className="footer__socials--a" target="_blank" rel="noopener noreferrer">
                    <TiSocialLinkedin className="footer__socials--a--icon"/>
                </a>
                <a href="https://instagram.com" className="footer__socials--a" target="_blank" rel="noopener noreferrer">
                    <TiSocialInstagram className="footer__socials--a--icon"/>
                </a>
            </div>
        </footer>
    );
}

export default Footer;