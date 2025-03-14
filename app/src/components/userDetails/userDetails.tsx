import './userDetails.scss'
import { PiShare } from "react-icons/pi";
import { GoStarFill } from "react-icons/go";
import { TiSocialInstagram, TiSocialLinkedin } from "react-icons/ti";
import { MdLink } from "react-icons/md";
import { FaDribbble } from "react-icons/fa";
import { RiFolderUserLine } from "react-icons/ri";

import profile from '../../assets/img/community/community19.png';

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

function userDetails() {
    return (
        <aside className="aside">
            <img src={profile} alt="profile" className="aside__profile" />
            <div className="aside__container">
                <h1 className="aside__container--h1">
                    Jan Kowalski
                </h1>
                <h2 className="aside__container--h2">
                    Rzeszów, Podkarpackie, Polska
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
                        111 222 333
                    </span>
                </div>
                <div className="aside__container--item">
                    Email 
                    <span className="aside__container--item--value">
                        nazwa@host.com
                    </span>
                </div>

                <h2 className="aside__container--h2">
                    W sieci
                </h2>
                {socialsItems.map(({ id, name, value }) => (
                    <a href={value} key={id} className="aside__container--link" target="_blank" rel="noopener noreferrer">
                        <span className="aside__container--link--span">
                            {name === "Linkedin" && <TiSocialLinkedin className="aside__container--link--span--icon" />}
                            {name === "Instagram" && <TiSocialInstagram className="aside__container--link--span--icon" />}
                            {name === "Other" && <MdLink className="aside__container--link--span--icon" />}
                            {name === "Dribbble" && <FaDribbble className="aside__container--link--span--icon" />}
                            {name === "Portfolio" && <RiFolderUserLine className="aside__container--link--span--icon" />}
                            {name}
                        </span>
                        <PiShare className="aside__container--link--share-icon" />
                    </a>
                ))}
            
                <h2 className="aside__container--h2">
                    O mnie
                </h2>
                <p className="aside__container--p">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores officiis nisi,
                     sint quia ea inventore soluta voluptas obcaecati aliquam provident velit sit illum
                      qui similique quas praesentium quisquam eaque libero.
                </p>
            </div>
        </aside>
    );
}

export default userDetails;