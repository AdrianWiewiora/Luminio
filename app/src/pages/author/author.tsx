import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './author.scss';

import Header from '../../components/header/header.tsx';
import Banner from '../../components/banner/banner.tsx';
import UserDetails from '../../components/userDetails/userDetails.tsx';
import AuthorNav from '../../components/nav/authorNav.tsx';
import ProfilePopup from '../../components/pop-ups/profile/profilePopup.tsx';
import PicturePopup from '../../components/pop-ups/picture/picturePopup.tsx';
import AlbumPopup from "../../components/pop-ups/albums/albumPopup.tsx";
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
}

function Author() {
    const { id: userId } = useParams();
    const navigate = useNavigate();
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [isPicturePopupOpen, setIsPicturePopupOpen] = useState(false);
    const [isAlbumPopupOpen, setIsAlbumPopupOpen] = useState(false);
    const [loggedUserId, setLoggedUserId] = useState<number | null>(null);
    const [userExists, setUserExists] = useState(true);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await fetch('/api/users');
                if (response.ok) {
                    const data = await response.json();
                    setAllUsers(data);
                }
            } catch (error) {
                console.error("Błąd podczas pobierania listy użytkowników:", error);
            }
        };

        fetchAllUsers();
    }, []);

    useEffect(() => {
        if (allUsers.length > 0) {
            const userExists = allUsers.some(user => user.id === Number(userId));
            if (!userExists) {
                setUserExists(false);
            }
        }
    }, [allUsers, userId]);

    useEffect(() => {
        if (!userExists) {
            navigate('/not-found');
        }
    }, [userExists, navigate]);

    useEffect(() => {
        const fetchLoggedUser = async () => {
            try {
                const response = await fetch('/api/users/me', {
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

    const togglePicturePopup = () => {
        setIsPicturePopupOpen(!isPicturePopupOpen);
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

    if (!userExists) {
        return null;
    }

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
                            onPicturePopupClick={togglePicturePopup}
                        />
                    )}
                    {isLoading ? (
                        <div className="loading-message">Ładowanie albumów...</div>
                    ) : albums.length === 0 ? (
                        <div className="empty-albums-message">
                            Fotograf nie dodał jeszcze żadnej zawartości
                        </div>
                    ) : (
                        <AlbumGrid 
                            albums={albums} 
                            loggedUserId={loggedUserId}
                            onEditClick={handleEditAlbum}
                        />
                    )}
                </div>
            </div>
            {isProfilePopupOpen && <ProfilePopup onClose={toggleProfilePopup} />}
            {isPicturePopupOpen && <PicturePopup onClose={togglePicturePopup} />}
            {isAlbumPopupOpen && loggedUserId && (
                <AlbumPopup
                    onClose={toggleAlbumPopup}
                    userId={loggedUserId}
                    albumData={editingAlbum || undefined}
                    onAlbumUpdated={handleAlbumUpdated}
                    mode={editingAlbum ? 'edit' : 'create'}
                />
            )}
        </div>
    );
}

export default Author;