import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import './author.scss';

import Header from '../../components/header/header.tsx';
import Banner from '../../components/banner/banner.tsx';
import AlbumElement from '../../components/album/albumElement.tsx';
import UserDetails from '../../components/userDetails/userDetails.tsx'; 
import AuthorNav from '../../components/nav/authorNav.tsx';
import ProfilePopup from '../../components/pop-ups/profile/profilePopup.tsx';
import PicturePopup from '../../components/pop-ups/picture/picturePopup.tsx';
import AlbumPopup from "../../components/pop-ups/albums/albumPopup.tsx";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    city?: string;
    user_description?: string;
}

function Author() {
    const { id: userId } = useParams(); 
    const navigate = useNavigate(); // Hook do nawigacji
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [isPicturePopupOpen, setIsPicturePopupOpen] = useState(false);
    const [isAlbumPopupOpen, setIsAlbumPopupOpen] = useState(false);
    const [loggedUserId, setLoggedUserId] = useState<number | null>(null);
    const [userExists, setUserExists] = useState(true); 
    const [allUsers, setAllUsers] = useState<User[]>([]); 

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

    const toggleProfilePopup = () => {
        setIsProfilePopupOpen(!isProfilePopupOpen);
    };

    const togglePicturePopup = () => {
        setIsPicturePopupOpen(!isPicturePopupOpen);
    };

    const toggleAlbumPopup = () => {
        setIsAlbumPopupOpen(!isAlbumPopupOpen);
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
                    <AlbumElement />
                </div>
            </div>
            {isProfilePopupOpen && <ProfilePopup onClose={toggleProfilePopup} />}
            {isPicturePopupOpen && <PicturePopup onClose={togglePicturePopup} />}
            {isAlbumPopupOpen && <AlbumPopup onClose={toggleAlbumPopup} />}
        </div>
    );
}

export default Author;