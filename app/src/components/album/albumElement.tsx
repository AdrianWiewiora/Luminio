import "./albumElement.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { noImageAvailable } from "../../assets/img/imgExport.tsx";
import { FaStar, FaCog } from "react-icons/fa";

interface AlbumElementProps {
    albumId: number;
    title: string;
    isPublic: boolean;
    userId: number;
    loggedUserId: number | null | undefined;
    description?: string;
    serviceId?: number;
    coverId?: number;
    onEditClick?: (albumId: number) => void;
    onDeleteClick?: (albumId: number) => void;
}

interface AlbumReview {
    value: number;
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
    const [preview, setPreview] = useState(noImageAvailable);
    const [averageRating, setAverageRating] = useState<number | null>(null);
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
            try {
                const response = await fetch(`/api/files/${coverId}`);
                if (response.ok) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    setPreview(imageUrl);
                } else {
                    console.error("Nie udało się pobrać okładki:", response.statusText);
                }
            } catch (error) {
                console.error("Błąd podczas pobierania okładki:", error);
            }
        };
    
        if (userId && coverId) {
            fetchPhoto();
        }
    }, [userId, coverId]);

    useEffect(() => {
        const fetchAlbumReviews = async () => {
            try {
                const response = await fetch(`/api/albums/${albumId}/album_reviews`);
                if (response.ok) {
                    const reviews: AlbumReview[] = await response.json();
                    
                    if (reviews && reviews.length > 0) {
                        const totalRating = reviews.reduce((sum, review) => sum + review.value, 0);
                        const avgRating = totalRating / reviews.length;
                        setAverageRating(avgRating);
                    } else {
                        setAverageRating(0);
                    }
                }
            } catch (error) {
                console.error("Błąd podczas pobierania recenzji albumu:", error);
            }
        };

        fetchAlbumReviews();
    }, [albumId]);

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
                                                <p onClick={handleDeleteClick}>Usuń</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="rating_container">
                            <div className="rating">
                                <span>
                                    {averageRating !== null ? (
                                        averageRating.toFixed(1)
                                    ) : (
                                        "Brak"
                                    )}
                                </span> 
                                <FaStar className="star_icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default AlbumElement;