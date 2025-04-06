import "./profilePopup.scss";
import Submit from "../../btn/submit/submit.tsx";
import FormInput from "../../inputs/formInput/formInput.tsx";
import TextArea from "../../inputs/textarea/textArea.tsx";
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
    { id: "Miasto", label: "Miasto", type: "text" },
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
        Object.fromEntries([
            ...ProfileForm.map(({ id }) => [id, ""]),
            ["Opis", ""]
        ])
    );

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
                        "Miasto": userData.city || "",
                        "Lokalizacja": userData.location || "",
                        "Portfolio": userData.portfolio || "",
                        "Linkedin": userData.linkedin || "",
                        "Instagram": userData.instagram || "",
                        "Dribbble": userData.dribbble || "",
                        "Inne": userData.other || "",
                        "Telefon": userData.phone || "",
                        "Email": userData.email || "",
                        "Opis": userData.description || "",
                    });
                }
            } catch (error) {
                console.error("Błąd podczas pobierania danych użytkownika:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
          const userResponse = await fetch('/api/users/me', {
            credentials: 'include'
          });
          
          if (!userResponse.ok) {
            throw new Error("Nie udało się pobrać danych użytkownika");
          }
          
          const userData = await userResponse.json();
          const userId = userData.id;
      
          const response = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              first_name: formData["Imię"],
              last_name: formData["Nazwisko"],
              city: formData["Miasto"],
              location: formData["Lokalizacja"],
              portfolio: formData["Portfolio"],
              linkedin: formData["Linkedin"],
              instagram: formData["Instagram"],
              dribbble: formData["Dribbble"],
              other: formData["Inne"],
              phone: formData["Telefon"],
              email: formData["Email"],
              description: formData["Opis"]
            })
          });
      
          const responseText = await response.text(); 
          
          try {
            const responseData = responseText ? JSON.parse(responseText) : {};
            
            if (!response.ok) {
              console.error("Błąd serwera:", responseData);
              throw new Error(responseData.message || "Błąd podczas aktualizacji danych");
            }
      
            console.log("Dane zostały zaktualizowane:", responseData);
            onClose();
          } catch (jsonError) {
            console.error("Serwer zwrócił nieprawidłowy JSON:", responseText);
            throw new Error("Nieprawidłowa odpowiedź serwera");
          }
        } catch (error) {
          console.error("Błąd podczas wysyłania danych:", error);
        }
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
                        <form 
                            className="profile-popup__content--section--basic-info--form"
                            onSubmit={handleSubmit} 
                        >
                            {ProfileForm.map(({ id, label, type }) => (
                                <FormInput
                                    key={id}
                                    id={id}
                                    label={label}
                                    type={type}
                                    value={formData[id] || ""}
                                    onChange={handleInputChange}
                                    required={false}
                                />
                            ))}
                            <div profile-popup__content--section--basic-info--textforminput>
                            <TextArea 
                                id="Opis"
                                label="Opis"
                                value={formData["Opis"] || ""}
                                onChange={handleTextAreaChange}
                            />
                            </div>
                            <div className="profile-popup__content--section--basic-info--form--options">
                                <p onClick={onClose}> 
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