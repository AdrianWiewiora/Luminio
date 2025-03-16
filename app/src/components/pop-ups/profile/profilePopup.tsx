import "./profilePopup.scss";
import { FaRegCircleXmark } from "react-icons/fa6";
import { Community19 } from "../../../assets/img/imgExport";

const navElements = [
    { id: 0, name: "Podstawowe informacje" },
    { id: 1, name: "W sieci" },
    { id: 2, name: "Kontakt" },
    { id: 3, name: "O mnie" }
]

interface ProfilePopupProps {
    onClose: () => void;
}

function ProfilePopup({ onClose }: ProfilePopupProps) {
    return (
        <section className="profile-popup" onClick={onClose}>
            <div className="profile-popup__content" onClick={(e) => e.stopPropagation()}>
                <button className="profile-popup__content--button" onClick={onClose}>
                    <FaRegCircleXmark className="profile-popup__content--button--icon"/>
                </button>
                <div className="profile-popup__content--nav">
                    {navElements.map(({id, name}) =>
                        <span key={id} className="profile-popup__content--nav--element">
                            {name}
                        </span>
                    )}
                </div>
                <form className="profile-popup__content--form">
                    <section className="profile-popup__content--form--basic-info">
                        <div className="profile-popup__content--form--basic-info--profil">
                            <h1>
                                Podstawowe informacje
                            </h1>
                            <img src={Community19} alt="profil-image" />
                        </div>
                    </section>
                </form>
            </div>
        </section>
    );
}

export default ProfilePopup;
