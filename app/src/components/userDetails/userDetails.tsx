import './userDetails.scss';
import { PiShare } from "react-icons/pi";
import { GoStarFill } from "react-icons/go";
import { TiSocialInstagram, TiSocialLinkedin } from "react-icons/ti";
import { MdLink } from "react-icons/md";
import { FaDribbble } from "react-icons/fa";
import { RiFolderUserLine } from "react-icons/ri";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import profile from '../../assets/img/community/community19.png';
import {useNavigate} from "npm:react-router@7.3.0/dist/production/index.d.ts";

const serviceItems = [
    { id: 1, name: "Ślubne" },
    { id: 2, name: "Sesje zdjęciowe" },
    { id: 3, name: "Komunijne" },
    { id: 4, name: "Artystyczne" },
    { id: 5, name: "Portretowe" }
];

const infoItems = [
    { id: 1, name: "Średnia", value: "4.7" },
    { id: 2, name: "Opinie", value: "134" },
    { id: 3, name: "Komentarze", value: "23" },
    { id: 4, name: "Albumy", value: "6" }
];

const socialsItems = [
    { id: 1, name: "Linkedin", value: "https://linkedin.com/" },
    { id: 2, name: "Dribbble", value: "https://dribbble.com/" },
    { id: 3, name: "Instagram", value: "https://www.instagram.com/" },
    { id: 4, name: "Portfolio", value: "https://www.canva.com/" },
    { id: 5, name: "Other", value: "https://github.com/" },
];

interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    city: string;
    user_description: string;
    email: string;
    phone: string;
    linkedin: string;
    instagram: string;
    dribbble: string;
    portfolio: string;
    other: string;
}

function UserDetails() {
    const { id: userId } = useParams();
    const [userData, setUserData] = useState<UserData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`);
                if (response.ok) {
                    const data: UserData = await response.json();
                    setUserData(data);
                } else {
                    navigate('/not-found');
                    console.error("Błąd podczas pobierania danych użytkownika:", response.statusText);
                }
            } catch (error) {
                console.error("Błąd podczas pobierania danych użytkownika:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!userData) {
        return <div>Ładowanie...</div>;
    }

    return (
        <aside className="aside">
            <img src={profile} alt="profile" className="aside__profile" />
            <div className="aside__container">
                <h1 className="aside__container--h1">
                    {userData.first_name} {userData.last_name}
                </h1>
                <h2 className="aside__container--h2">
                    {userData.city}
                </h2>
                <ul className="aside__container--services-ul">
                    {serviceItems.map(({id, name}) => (
                        <li key={id} className="aside__container--services-ul--li">
                            {name}
                        </li>
                    ))}
                </ul>
            
                <h2 className="aside__container--h2">
                    Informacje
                </h2>
                {infoItems.map(({ id, name, value }) => (
                    <div key={id} className="aside__container--item">
                        {name}
                        <span className="aside__container--item--value">
                            {value} 
                            {name === "Średnia" && <GoStarFill className="aside__container--item--icon" />}
                        </span>
                    </div>
                ))}

                <h2 className="aside__container--h2"> 
                    Kontakt
                </h2>
                <div className="aside__container--item">
                    Telefon 
                    <span className="aside__container--item--value"> 
                        {userData.phone}
                    </span>
                </div>
                <div className="aside__container--item">
                    Email 
                    <span className="aside__container--item--value">
                        {userData.email}
                    </span>
                </div>

                <h2 className="aside__container--h2">
                    W sieci
                </h2>
                {[
                    { id: 1, name: "Linkedin", value: userData.linkedin, icon: <TiSocialLinkedin className="aside__container--link--span--icon" /> },
                    { id: 2, name: "Instagram", value: userData.instagram, icon: <TiSocialInstagram className="aside__container--link--span--icon" /> },
                    { id: 3, name: "Portfolio", value: userData.portfolio, icon: <RiFolderUserLine className="aside__container--link--span--icon" /> },
                    { id: 4, name: "Dribbble", value: userData.dribbble, icon: <FaDribbble className="aside__container--link--span--icon" /> },
                    { id: 5, name: "Other", value: userData.other, icon: <MdLink className="aside__container--link--span--icon" /> },
                ].map(({ id, name, value, icon }) => (
                    <a href={value} key={id} className="aside__container--link" target="_blank" rel="noopener noreferrer">
                        <span className="aside__container--link--span">
                            {icon}
                            {name}
                        </span>
                        <PiShare className="aside__container--link--share-icon" />
                    </a>
                ))}
            
                <h2 className="aside__container--h2">
                    O mnie
                </h2>
                <p className="aside__container--p">
                    {userData.user_description}
                </p>
            </div>
        </aside>
    );
}

export default UserDetails;