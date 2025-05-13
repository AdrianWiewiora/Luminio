import './userDetails.scss';
import { PiShare } from "react-icons/pi";
import { GoStarFill } from "react-icons/go";
import { TiSocialInstagram, TiSocialLinkedin } from "react-icons/ti";
import { MdLink } from "react-icons/md";
import { FaDribbble } from "react-icons/fa";
import { RiFolderUserLine } from "react-icons/ri";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import profile from '../../assets/img/community/community19.png';

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  city: string;
  user_description: string;
  email: string;
  phone_number: string;
  linkedin: string;
  instagram: string;
  dribbble: string;
  portfolio: string;
  other: string;
  average_rating: string | null;
  comment_count: string;
  album_count: string;
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
          console.log("Dane użytkownika:", data);
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

        <h2 className="aside__container--h2">
          Informacje
        </h2>

        <div className="aside__container--item">
          Średnia
          <span className="aside__container--item--value">
            {userData.average_rating ? parseFloat(userData.average_rating).toFixed(1) : 'Brak'}
            <GoStarFill className="aside__container--item--icon" />
          </span>
        </div>
        <div className="aside__container--item">
          Komentarze
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
