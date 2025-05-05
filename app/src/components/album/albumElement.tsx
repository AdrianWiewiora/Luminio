import "./albumElement.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { paralax10 } from "../../assets/img/imgExport.tsx";
import { FaStar, FaCog } from "react-icons/fa";

interface AlbumElementProps {
    albumId: number;
    title: string;
    isPublic: boolean;
    userId: number;
    loggedUserId: number | null | undefined;
    description?: string;
    serviceId?: number;
    onEditClick?: (albumId: number) => void;
}

function AlbumElement({ 
    albumId, 
    title, 
    isPublic, 
    userId, 
    loggedUserId,
    description = "",
    serviceId = 0,
    onEditClick
}: AlbumElementProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    let timeoutId: number;

    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
        setMenuOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setMenuOpen(false);
        }, 1000);
    };

    const handleMenuClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onEditClick) {
            onEditClick(albumId);
        }
    };

    return (
        <Link to={`/album/${albumId}`} className="album-link">
            <div className="album">
                <div className="album_img">
                    <img src={paralax10} alt="Album" className="album_img--content" />
                    <div className="album_overlay"></div>
                    <p className="album_title">{title}</p>
                    <div className="album_icons">
                        <div className="rating">
                            <div className="rating_container">
                                {loggedUserId === userId && (
                                    <div className="settings_wrapper" 
                                         onMouseEnter={handleMouseEnter} 
                                         onMouseLeave={handleMouseLeave}
                                         onClick={handleMenuClick}>
                                        <FaCog className="settings_icon"/>
                                        {menuOpen && (
                                            <div className="dropdown_menu">
                                                <p onClick={handleEditClick}>Edytuj</p>
                                                <p>Usuń</p>
                                            </div>
                                        )}
                                    </div>
                                )}
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
        </Link>
    );
}

export default AlbumElement;