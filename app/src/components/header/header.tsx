import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./header.scss";
import Logo from '../../assets/img/logo.png';

// Definiujemy typ dla danych użytkownika
interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    user_description?: string;
    city?: string;
}

const navItems = [
    { id: 1, name: <Link to="/gallery">Eksploruj</Link> },
    { id: 2, name: <Link to="/gallery">Albumy</Link> },
    { id: 3, name: <Link to="/gallery">Znajdź fotografa</Link> }
];

function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null); // Określamy typ dla userData

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/users/me", {
                    credentials: "include",
                });

                if (response.ok) {
                    const userData: UserData = await response.json(); // Określamy typ dla userData
                    console.log("User data:", userData);
                    setIsLoggedIn(true);
                    setUserData(userData);
                } else {
                    setIsLoggedIn(false);
                    setUserData(null);
                }
            } catch (error) {
                setIsLoggedIn(false);
                setUserData(null);
            }
        };

        checkSession();
    }, []);

    const handleLogout = () => {
        document.cookie = 'SESSION=; Max-Age=0; Path=/; Secure; SameSite=Strict';
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/");
    };

    return (
        <header className="header">
            <div className="header__nav-container">
                <Link to="/">
                    <img src={Logo} alt="logo" className="header__nav-container--logo" />
                </Link>
                <nav className="header__nav-container--nav">
                    <ul className="header__nav-container--nav--ul">
                        {navItems.map(({ id, name }) => (
                            <li key={id} className="header__nav-container--nav--ul--li">
                                {name}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <section className="header__btn-container">
                {!isLoggedIn ? (
                    <>
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
                    </>
                ) : (
                    <div className="header__btn-container">
                        {userData ? `${userData.first_name} ${userData.last_name}` : "Użytkownik"}
                        <div className="header__btn-container--trigger">
                            <div className="trigger-circle"></div>
                            <ul className="header__btn-container--profile">
                                <Link to="#">
                                    Mój profil
                                </Link>
                                <li onClick={handleLogout} className="header__btn-container--log-in--log-out">
                                    Wyloguj 
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </section>
        </header>
    );
}

export default Header;