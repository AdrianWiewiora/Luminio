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

const infoItems = [
    { id: 1, name: "Średnia", value: "" },
    { id: 2, name: "Opinie", value: "0" },
    { id: 3, name: "Albumy", value: "0" }
];

interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    city: string;
    user_description: string;
    email: string;
    phone_number: string;
    average_rating: string;
    comment_count: string;
    album_count: string;
    linkedin?: string;
    instagram?: string;
    portfolio?: string;
    dribbble?: string;
    other?: string;
}

function UserDetails() {
    const { id: userId } = useParams();
    const [userData, setUserData] = useState<UserData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/me`);
                if (!response.ok) {
                    navigate('/not-found');
                    console.error("Błąd podczas pobierania danych użytkownika:", response.statusText);
                    return;
                }
                const data: UserData = await response.json();
                console.log(data);
                const contactsResponse = await fetch(`/api/users/${data.id}/contacts`, {
                    credentials: 'include',
                });
                if (contactsResponse.ok) {
                    const contactsArray = await contactsResponse.json();
                    const contactsObject = contactsArray.reduce((acc: Partial<UserData>, contact: { name: string; contact_info: string }) => {
                        switch (contact.name) {
                            case "Portfolio":
                                acc.portfolio = contact.contact_info || "";
                                break;
                            case "Linkedin":
                                acc.linkedin = contact.contact_info || "";
                                break;
                            case "Instagram":
                                acc.instagram = contact.contact_info || "";
                                break;
                            case "Dribbble":
                                acc.dribbble = contact.contact_info || "";
                                break;
                            case "Inne":
                                acc.other = contact.contact_info || "";
                                break;
                            default:
                                console.warn(`Nieznany typ kontaktu: ${contact.name}`);
                        }
                        return acc;
                    }, {});
                    setUserData({ ...data, ...contactsObject });
                } else {
                    console.error("Błąd podczas pobierania kontaktów:", contactsResponse.statusText);
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

    const socials = [
        { id: 1, name: "Linkedin", value: userData.linkedin, icon: <TiSocialLinkedin className="aside__container--link--span--icon" /> },
        { id: 2, name: "Instagram", value: userData.instagram, icon: <TiSocialInstagram className="aside__container--link--span--icon" /> },
        { id: 3, name: "Portfolio", value: userData.portfolio, icon: <RiFolderUserLine className="aside__container--link--span--icon" /> },
        { id: 4, name: "Dribbble", value: userData.dribbble, icon: <FaDribbble className="aside__container--link--span--icon" /> },
        { id: 5, name: "Other", value: userData.other, icon: <MdLink className="aside__container--link--span--icon" /> },
    ].filter(({ value }) => value && value.trim() !== "");

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
            
                <h2 className="aside__container--h2">
                    Informacje
                </h2>
                <div className="aside__container--item">
                    Średnia
                    <span className="aside__container--item--value">
                        {userData.average_rating ? (
                            <>
                                {userData.average_rating}
                                <GoStarFill className="aside__container--item--icon" />
                            </>
                        ) : (
                            "--"
                        )} 
                    </span>
                </div>
                <div className="aside__container--item">
                    Opinie
                    <span className="aside__container--item--value">
                        {userData.comment_count} 
                    </span>
                </div>
                <div className="aside__container--item">
                    Albumy
                    <span className="aside__container--item--value">
                        {userData.album_count} 
                    </span>
                </div>

                <h2 className="aside__container--h2"> 
                    Kontakt
                </h2>
                <div className="aside__container--item">
                    Telefon 
                    <span className="aside__container--item--value"> 
                        {userData.phone_number}
                    </span>
                </div>
                <div className="aside__container--item">
                    Email 
                    <span className="aside__container--item--value">
                        {userData.email}
                    </span>
                </div>
                {socials.length > 0 && (
                    <>
                        <h2 className="aside__container--h2">W sieci</h2>
                        {socials.map(({ id, name, value, icon }) => (
                            <a href={value} key={id} className="aside__container--link" target="_blank" rel="noopener noreferrer">
                                <span className="aside__container--link--span">
                                    {icon}
                                    {name}
                                </span>
                                <PiShare className="aside__container--link--share-icon" />
                            </a>
                        ))}
                    </>
                )}
                <h2 className="aside__container--h2">
                    O mnie
                </h2>
                <p className="aside__container--p">
                    {userData.user_description || "Brak informacji o tym użytkowniku. Na pewno jest świetny."}
                </p>
            </div>
        </aside>
    );
}

export default UserDetails;