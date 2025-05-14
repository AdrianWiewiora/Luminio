import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './author.scss';

import Header from '../../components/header/header.tsx';
import Banner from '../../components/banner/banner.tsx';
import UserDetails from '../../components/userDetails/userDetails.tsx';
import AuthorNav from '../../components/nav/authorNav.tsx';
import ProfilePopup from '../../components/pop-ups/profile/profilePopup.tsx';
import CreateAlbumPopup from "../../components/pop-ups/albums/createAlbumPopup.tsx";
import EditAlbumPopup from "../../components/pop-ups/albums/editAlbumPopup.tsx";
import AlbumGrid from "../../components/ImgGrid/albumGrid/albumGrid.tsx";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    city?: string;
    user_description?: string;
}

interface Album {
    id: number;
    user_id: number;
    name: string;
    description: string;
    tag: string;
    is_public: boolean;
    service_id: number;
    cover_id: number;
}

function Author() {
    const { id: userId } = useParams();
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [isAlbumPopupOpen, setIsAlbumPopupOpen] = useState(false);
    const [loggedUserId, setLoggedUserId] = useState<number | null>(null);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);

    useEffect(() => {
        const fetchLoggedUser = async () => {
            try {
                const response = await fetch('/api/me', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setLoggedUserId(data.id);
                }
            } catch (error) {
                console.error("Błąd podczas pobierania danych zalogowanego użytkownika:", error);
            }
        };

        fetchLoggedUser();
    }, []);

    useEffect(() => {
        const fetchAlbums = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/users/${userId}/albums`);
                if (response.ok) {
                    const data = await response.json();
                    setAlbums(data);
                }
            } catch (error) {
                console.error("Błąd podczas pobierania albumów:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchAlbums();
        }
    }, [userId]);

    const toggleProfilePopup = () => {
        setIsProfilePopupOpen(!isProfilePopupOpen);
    };

    const toggleAlbumPopup = () => {
        setIsAlbumPopupOpen(!isAlbumPopupOpen);
        setEditingAlbum(null);
    };

    const handleEditAlbum = (albumId: number) => {
        const albumToEdit = albums.find(album => album.id === albumId);
        if (albumToEdit) {
            setEditingAlbum(albumToEdit);
            setIsAlbumPopupOpen(true);
        }
    };

    const handleDeleteAlbum = async (albumId: number) => {
        const confirmDelete = globalThis.confirm("Czy na pewno chcesz usunąć ten album?");
        if (!confirmDelete) return;
    
        try {
            const response = await fetch(`/api/albums/${albumId}`, {
                method: "DELETE",
                credentials: "include",
            });
    
            if (response.ok) {
                setAlbums(prev => prev.filter(album => album.id !== albumId));
            } else {
                console.error("Nie udało się usunąć albumu:", response.statusText);
            }
        } catch (error) {
            console.error("Błąd podczas usuwania albumu:", error);
        }
    };

    const handleAlbumUpdated = () => {
        fetchAlbums();
        setIsAlbumPopupOpen(false);
        setEditingAlbum(null);
    };

    const fetchAlbums = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/users/${userId}/albums`);
            if (response.ok) {
                const data = await response.json();
                setAlbums(data);
            }
        } catch (error) {
            console.error("Błąd podczas pobierania albumów:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <Banner />
            <div className="content">
                <UserDetails />
                <div className="content__item-grid">
                    {loggedUserId !== null && loggedUserId === Number(userId) && (
                        <AuthorNav
                            onCustomizeProfileClick={toggleProfilePopup}
                            onAlbumPopupClick={toggleAlbumPopup}
                        />
                    )}
                    {isLoading ? (
                        <div className="loading-message">Ładowanie albumów...</div>
                    ) : albums.length === 0 ? (
                        <div className="empty-albums-message">
                            Użytkownik nie dodał jeszcze żadnej zawartości
                        </div>
                    ) : (
                        <AlbumGrid 
                            albums={albums} 
                            loggedUserId={loggedUserId}
                            onEditClick={handleEditAlbum}
                            onDeleteClick={handleDeleteAlbum}
                        />
                    )}
                </div>
            </div>
            {isProfilePopupOpen && <ProfilePopup onClose={toggleProfilePopup} />}
            {isAlbumPopupOpen && loggedUserId && (
                editingAlbum ? (
                    <EditAlbumPopup
                        onClose={toggleAlbumPopup}
                        userId={loggedUserId}
                        albumData={editingAlbum}
                        onAlbumUpdated={handleAlbumUpdated}
                    />
                ) : (
                    <CreateAlbumPopup
                        onClose={toggleAlbumPopup}
                        userId={loggedUserId}
                        onAlbumCreated={handleAlbumUpdated}
                    />
                )
            )}
        </div>
    );
}

export default Author;