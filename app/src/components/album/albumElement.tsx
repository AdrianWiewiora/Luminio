import "./albumElement.scss";
import React, { useState, useEffect } from "react";
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
    coverId?: number,
    onEditClick?: (albumId: number) => void;
    onDeleteClick?: (albumId: number) => void;
}

function AlbumElement({ 
    albumId, 
    title, 
    isPublic, 
    userId, 
    loggedUserId,
    description = "",
    serviceId = 0,
    coverId,
    onEditClick,
    onDeleteClick
}: AlbumElementProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [preview, setPreview] = useState(paralax10);
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

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDeleteClick) {
            onDeleteClick(albumId);
        }
    };

    useEffect(() => {
        const fetchPhoto = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/photos/${coverId}`);
                if (response.ok) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    setPreview(imageUrl);
                } else {
                    console.error("Nie udało się pobrać okładki:", response.statusText);
                }
            } catch (error) {
                console.error("Błąd podczas pobierania okładki:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        if (userId && coverId) {
            fetchPhoto();
        }
    }, [userId, coverId]);

    return (
        <Link to={`/album/${albumId}`} className="album-link">
            <div className="album">
                <div className="album_img">
                    <img src={preview} alt="Album" className="album_img--content" />
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
                                                {isPublic ? (
                                                    <p>Wycofaj publikację</p>
                                                ) : (
                                                    <p>Opublikuj</p>
                                                )}
                                                <p onClick={handleDeleteClick}>Usuń</p>
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