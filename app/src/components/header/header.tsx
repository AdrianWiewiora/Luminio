import { Link } from "react-router-dom";

import "./header.scss";
import Logo from '../../assets/img/logo.png';

const navItems = [
    { id: 1, name: <Link to="/gallery">Ekspolruj</Link> },
    { id: 2, name: "Znajdź fotografie" },
    { id: 3, name: "Losuj" }
]

function Header(){
    return(
        <header className="header">
            <div className="header__nav-container">
                <Link to="/">
                    <img src={Logo} alt="logo" className="header__nav-container--logo"/>
                </Link>
                <nav className="header__nav-container--nav">
                    <ul className="header__nav-container--nav--ul">
                        {navItems.map(({id, name}) => (
                        <li key={id} className="header__nav-container--nav--ul--li">
                            {name}
                        </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <section className="header__btn-container">
                <div className="header__btn-container--log-in">
                    <Link to="/login" className="header__btn-container--log-in--text">
                        Zaloguj się
                    </Link>
                </div>
                <Link to="/registration">
                    <div className="header__btn-container--sign-in">
                        <span className="header__btn-container--sign-in--text">
                            Zarejestruj się
                        </span>
                    </div>
                </Link>
            </section>
        </header>
    );
}

export default Header;