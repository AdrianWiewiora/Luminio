import { useState } from 'react';
import './author.scss';

import Header from '../../components/header/header.tsx';
import Banner from '../../components/banner/banner.tsx';
import AlbumElement from '../../components/album/albumElement.tsx';
import UserDetails from '../../components/userDetails/userDetails.tsx';
import AuthorNav from '../../components/nav/authorNav.tsx';
import ProfilePopup from '../../components/pop-ups/profile/profilePopup.tsx';
import PicturePopup from '../../components/pop-ups/picture/picturePopup.tsx';
import AlbumPopup from "../../components/pop-ups/albums/albumPopup.tsx";


function Author() {
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [isPicturePopupOpen, setIsPicturePopupOpen] = useState(false);
    const [isAlbumPopupOpen, setIsAlbumPopupOpen] = useState(false);

    const toggleProfilePopup = () => {
        setIsProfilePopupOpen(!isProfilePopupOpen);
    };

    const togglePicturePopup = () => {
        setIsPicturePopupOpen(!isPicturePopupOpen);
    };

    const toggleAlbumPopup = () => {
        setIsAlbumPopupOpen(!isAlbumPopupOpen);
    };

    return (
        <div>
            <Header />
            <Banner />
            <div className="content">
                <UserDetails />
                <div className="content__item-grid">
                    <AuthorNav 
                        onCustomizeProfileClick={toggleProfilePopup} 
                        onAlbumPopupClick={toggleAlbumPopup} // Obsługa Kolekcje Zdjęć (AlbumPopup)
                        onPicturePopupClick={togglePicturePopup} // Obsługa Dodaj (PicturePopup)
                    />
                    <div>
                    
                    </div>
                    <AlbumElement/>
                </div>
                
            </div>
            {isProfilePopupOpen && <ProfilePopup onClose={toggleProfilePopup} />}
            {isPicturePopupOpen && <PicturePopup onClose={togglePicturePopup} />}
            {isAlbumPopupOpen && <AlbumPopup onClose={toggleAlbumPopup} />}

            
        </div>
    );
}

export default Author;
