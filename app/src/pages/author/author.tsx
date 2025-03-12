import { useState } from 'react';
import './author.scss';

import Header from '../../components/header/header';
import Banner from '../../components/banner/banner';
import UserDetails from '../../components/userDetails/userDetails';
import AuthorNav from '../../components/nav/authorNav';
import ProfilePopup from '../../components/pop-ups/profile/profilePopup';
import PicturePopup from '../../components/pop-ups/picture/picturePopup';

function Author() {
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [isPicturePopupOpen, setIsPicturePopupOpen] = useState(false);

    const toggleProfilePopup = () => {
        setIsProfilePopupOpen(!isProfilePopupOpen);
    };

    const togglePicturePopup = () => {
        setIsPicturePopupOpen(!isPicturePopupOpen);
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
                        onViewPictureClick={togglePicturePopup} 
                    />
                </div>
            </div>
            {isProfilePopupOpen && <ProfilePopup onClose={toggleProfilePopup} />}
            {isPicturePopupOpen && <PicturePopup onClose={togglePicturePopup} />}
        </div>
    );
}

export default Author;
