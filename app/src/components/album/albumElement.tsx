import "./albumElement.scss";
import { useState } from "react";
import { paralax10 } from "../../assets/img/imgExport.tsx";
import { FaStar, FaCog } from "react-icons/fa";

const AlbumElement: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    let timeoutId: NodeJS.Timeout;

    const handleMouseEnter = () => {
        clearTimeout(timeoutId); // Cancel
        setMenuOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setMenuOpen(false);
        }, 1000); // Delay 1s
    };

    return (
        <div className="album">
            <div className="album_img">
                <img src={paralax10} alt="Album" className="album_img--content" />
                <div className="album_overlay"></div>
                <p className="album_title">Zdjęcia ślubne Agaty i Łukasza</p>
                <div className="album_icons">
                    <div className="rating">
                        <div className="rating_container">
                            <div className="settings_wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <FaCog className="settings_icon"/>
                                {menuOpen && (
                                    <div className="dropdown_menu">
                                        <p>Edytuj</p>
                                        <p>Wycofaj publikację</p>
                                        <p>Usuń</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="rating_container">
                        <div className="rating">
                            <span>4.7</span> <FaStar className="star_icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlbumElement;
