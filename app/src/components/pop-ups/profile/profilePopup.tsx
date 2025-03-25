import "./profilePopup.scss";
import Submit from "../../btn/submit/submit.tsx";
import FormInput from "../../inputs/formInput/formInput.tsx";
import { FaRegCircleXmark } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { Community19 } from "../../../assets/img/imgExport.tsx";
import { useState, useEffect } from "react"; 

const navElements = [
    { id: 0, name: "Podstawowe informacje" },
    { id: 1, name: "W sieci" },
    { id: 2, name: "Kontakt" },
    { id: 3, name: "O mnie" }
];

const ProfileForm = [
    { id: "Imię", label: "Imię", type: "text" },
    { id: "Nazwisko", label: "Nazwisko", type: "text" },
    { id: "Lokalizacja", label: "Lokalizacja", type: "text" },
    { id: "Portfolio", label: "Portfolio", type: "text" },
    { id: "Linkedin", label: "Linkedin", type: "text" },
    { id: "Instagram", label: "Instagram", type: "text" },
    { id: "Dribbble", label: "Dribbble", type: "text" },
    { id: "Inne", label: "Inne", type: "text" },
    { id: "Telefon", label: "Telefon", type: "text" },
    { id: "Email", label: "Email", type: "email" },
];

interface ProfilePopupProps {
    onClose: () => void;
}

function ProfilePopup({ onClose }: ProfilePopupProps) {
    const [formData, setFormData] = useState(
        Object.fromEntries(ProfileForm.map(({ id }) => [id, ""])
    ));

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/users/me', {
                    credentials: 'include', 
                });
                if (response.ok) {
                    const userData = await response.json();

                    setFormData({
                        "Imię": userData.first_name || "",
                        "Nazwisko": userData.last_name || "",
                        "Lokalizacja": userData.city || "",
                        "Portfolio": userData.portfolio || "",
                        "Linkedin": userData.linkedin || "",
                        "Instagram": userData.instagram || "",
                        "Dribbble": userData.dribbble || "",
                        "Inne": userData.other || "",
                        "Telefon": userData.phone || "",
                        "Email": userData.email || "",
                    });
                }
            } catch (error) {
                console.error("Błąd podczas pobierania danych użytkownika:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

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
                <section className="profile-popup__content--section">
                    <div className="profile-popup__content--section--basic-info">
                        <div className="profile-popup__content--section--basic-info--profil">
                            <h1>
                                Podstawowe informacje
                            </h1>
                            <img src={Community19} alt="profil-image" />
                            <span className="profile-popup__content--section--basic-info--profil--change-img">
                                <GoPencil /> Zmień
                            </span>
                        </div>
                        <form className="profile-popup__content--section--basic-info--form">
                            {ProfileForm.map(({ id, label, type }) => (
                                <FormInput
                                    key={id}
                                    id={id}
                                    label={label}
                                    type={type}
                                    value={formData[id] || ""}
                                    onChange={handleChange}
                                />
                            ))}
                            <div className="profile-popup__content--section--basic-info--form--options">
                                <p> 
                                    Anuluj
                                </p>
                                <Submit title="Zaktualizuj profil" />
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </section>
    );
}

export default ProfilePopup;