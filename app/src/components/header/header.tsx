import { Link } from "react-router-dom";

import "./header.scss";
import Logo from '../../assets/img/logo.png';

const navItems = [
    { id: 1, name: "Ekspolruj" },
    { id: 2, name: "Znajdź fotografie"},
    { id: 3, name: "Losuj"}
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
                    <Link to="/LogIn" className="header__btn-container--log-in--text">
                        Zaloguj się
                    </Link>
                </div>
                <div className="header__btn-container--sign-in">
                    <Link to="/Registration" className="header__btn-container--sign-in--text">
                        Zarejestruj się
                    </Link>
                </div>
            </section>
        </header>
    );
}

export default Header;