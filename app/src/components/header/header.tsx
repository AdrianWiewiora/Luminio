import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./header.scss";
import Logo from '../../assets/img/logo.png';

interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    user_description?: string;
    city?: string;
}

const navItems = [
    { id: 1, name: "Eksploruj", view: "photos" },
    { id: 2, name: "Albumy", view: "albums" },
    { id: 3, name: "Znajdź fotografa", view: "authors" }
];

function Header() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const view = searchParams.get("view") || "photos"; // Pobierz aktualny parametr `view` z URL
    const [activeView, setActiveView] = useState<string>(view); // Synchronizuj z parametrem `view`
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setActiveView(view); // Aktualizuj `activeView`, gdy parametr `view` się zmienia
    }, [view]);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/users/me", {
                    credentials: "include",
                });

                if (response.ok) {
                    const userData: UserData = await response.json();
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
        setIsMobileMenuOpen(false);
    };

    const handleNavClick = (view: string) => {
        navigate(`/gallery?view=${view}`);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="header__nav-container">
                <Link to="/">
                    <img src={Logo} alt="logo" className="header__nav-container--logo" />
                </Link>

                {/* Hamburger menu - mobile */}
                <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    ☰
                </div>

                <nav className="header__nav-container--nav">
                    <ul className="header__nav-container--nav--ul">
                        {navItems.map(({ id, name, view }) => (
                            <li key={id} className="header__nav-container--nav--ul--li">
                                <span 
                                    onClick={() => handleNavClick(view)}
                                    className={activeView === view ? "active" : ""}
                                >
                                    {name}
                                </span>
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

            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <ul className="mobile-menu__list">
                        {navItems.map(({ id, name, view }) => (
                            <li 
                            key={id} 
                            onClick={() => handleNavClick(view)}
                            className={activeView === view ? "active" : ""}>
                            {name}
                        </li>
                        ))}
                    </ul>
                    {!isLoggedIn && (
                        <div className="mobile-menu__auth">
                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Zaloguj się</Link>
                            <Link to="/registration" onClick={() => setIsMobileMenuOpen(false)}>Zarejestruj się</Link>
                        </div>
                    )}
                    {isLoggedIn && (
                        <div className="mobile-menu__auth">
                            <span>{userData?.first_name} {userData?.last_name}</span>
                            <li onClick={handleLogout}>Wyloguj</li>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;