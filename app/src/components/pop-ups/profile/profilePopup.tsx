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

const BasicInfoForm = [
    { id: "Imię", label: "Imię", type: "text" },
    { id: "Nazwisko", label: "Nazwisko", type: "text" },
    { id: "Miasto", label: "Miasto", type: "text" },
    { id: "Lokalizacja", label: "Lokalizacja", type: "text" },
    { id: "Telefon", label: "Telefon", type: "text" },
    { id: "Email", label: "Email", type: "email" },
];

const ContactForm = [
    { id: "Portfolio", label: "Portfolio", type: "text" },
    { id: "Linkedin", label: "Linkedin", type: "text" },
    { id: "Instagram", label: "Instagram", type: "text" },
    { id: "Dribbble", label: "Dribbble", type: "text" },
    { id: "Inne", label: "Inne", type: "text" },
];

interface ProfilePopupProps {
    onClose: () => void;
}

function ProfilePopup({ onClose }: ProfilePopupProps) {
    const [formData, setFormData] = useState(
        Object.fromEntries([
            ...BasicInfoForm.map(({ id }) => [id, ""]),
            ...ContactForm.map(({ id }) => [id, ""]),
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

    const handleBasicInfoSubmit = async (e: React.FormEvent) => {
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
      
            console.log("Dane podstawowe zostały zaktualizowane:", responseData);
            onClose();
          } catch (jsonError) {
            console.error("Serwer zwrócił nieprawidłowy JSON:", responseText);
            throw new Error("Nieprawidłowa odpowiedź serwera");
          }
        } catch (error) {
          console.error("Błąd podczas wysyłania danych podstawowych:", error);
        }
    };

    const handleContactsSubmit = async (e: React.FormEvent) => {
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
      
          const response = await fetch(`/api/users/${userId}/contacts`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              portfolio: formData["Portfolio"],
              linkedin: formData["Linkedin"],
              instagram: formData["Instagram"],
              dribbble: formData["Dribbble"],
              other: formData["Inne"]
            })
          });
      
          const responseText = await response.text(); 
          
          try {
            const responseData = responseText ? JSON.parse(responseText) : {};
            
            if (!response.ok) {
              console.error("Błąd serwera:", responseData);
              throw new Error(responseData.message || "Błąd podczas aktualizacji kontaktów");
            }
      
            console.log("Kontakty zostały zaktualizowane:", responseData);
            onClose();
          } catch (jsonError) {
            console.error("Serwer zwrócił nieprawidłowy JSON:", responseText);
            throw new Error("Nieprawidłowa odpowiedź serwera");
          }
        } catch (error) {
          console.error("Błąd podczas wysyłania kontaktów:", error);
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
                        <form className="profile-popup__content--section--basic-info--profil">
                            <h1>
                                Podstawowe informacje
                            </h1>
                            <img src={Community19} alt="profil-image" />
                            <div className="profile-popup__content--section--basic-info--profil--con">
                                <span className="profile-popup__content--section--basic-info--profil--change-img">
                                    <GoPencil /> Zmień
                                </span>
                                <button type="submit" className="profile-popup__content--section--basic-info--profil--btn">
                                </button>
                            </div>
                        </form>
                        <form 
                            className="profile-popup__content--section--basic-info--form"
                            onSubmit={handleBasicInfoSubmit} 
                        >
                            <h2>Dane osobowe</h2>
                            {BasicInfoForm.map(({ id, label, type }) => (
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
                            <div className="profile-popup__content--section--basic-info--textforminput">
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
                                <Submit title="Zapisz dane podstawowe" />
                            </div>
                        </form>
                        <form 
                            className="profile-popup__content--section--basic-info--form"
                            onSubmit={handleContactsSubmit} 
                        >
                            <h2>Media społecznościowe</h2>
                            {ContactForm.map(({ id, label, type }) => (
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
                            
                            <div className="profile-popup__content--section--basic-info--form--options">
                                <p onClick={onClose}> 
                                    Anuluj
                                </p>
                                <Submit title="Zapisz kontakty" />
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </section>
    );
}

export default ProfilePopup;