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
    { id: "Telefon", label: "Telefon", type: "text" },
    { id: "Email", label: "Email", type: "email" },
    { id: "Opis", label: "Opis", type: "textarea" },
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
    const [basicInfoData, setBasicInfoData] = useState(
        Object.fromEntries(BasicInfoForm.map(({ id }) => [id, ""]))
    );

    const [contactData, setContactData] = useState(
        Object.fromEntries(ContactForm.map(({ id }) => [id, ""]))
    );

    const [initialContactData, setInitialContactData] = useState(
        Object.fromEntries(ContactForm.map(({ id }) => [id, ""]))
    );

    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleBasicInfoChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        setBasicInfoData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setContactData((prevData) => ({ ...prevData, [id]: value }));
    }

    const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
    };
    useEffect(() => {
    const fetchUserData = async () => {
        try {
            // Fetch user basic info
            const userResponse = await fetch('/api/me', {
                credentials: 'include',
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                
                setBasicInfoData({
                    "Id": userData.id,
                    "Imię": userData.first_name || "",
                    "Nazwisko": userData.last_name || "",
                    "Miasto": userData.city || "",
                    "Telefon": userData.phone_number || "",
                    "Email": userData.email || "",
                    "Opis": userData.user_description || "",
                });

                // Fetch user contacts
                const contactsResponse = await fetch(`/api/users/${userData.id}/contacts`, {
                    credentials: 'include',
                });

                if (contactsResponse.ok) {
                    const contactsArray = await contactsResponse.json();

                    const contactsObject = contactsArray.reduce(
                        (acc: Record<string, string>, contact: { name: string; contact_info: string}) => {
                        switch (contact.name) {
                            case "Portfolio":
                                acc["Portfolio"] = contact.contact_info || "";
                                break;
                            case "Linkedin":
                                acc["Linkedin"] = contact.contact_info || "";
                                break;
                            case "Instagram":
                                acc["Instagram"] = contact.contact_info || "";
                                break;
                            case "Dribbble":
                                acc["Dribbble"] = contact.contact_info || "";
                                break;
                            case "Inne":
                                acc["Inne"] = contact.contact_info || "";
                                break;
                            default:
                                console.warn(`Nieznany typ kontaktu: ${contact.name}`);
                        }
                        return acc;
                    }, {});

                    setContactData(contactsObject);
                    setInitialContactData(contactsObject);
                }
            }
        } catch (error) {
            console.error("Błąd podczas pobierania danych użytkownika lub kontaktów:", error);
        }
    };

    fetchUserData();
}, []);


    const handleBasicInfoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            // Pobierz obecne dane formularza
            const currentUserData = {
                first_name: basicInfoData["Imię"],
                last_name: basicInfoData["Nazwisko"],
                city: basicInfoData["Miasto"],
                phone_number: basicInfoData["Telefon"],
                email: basicInfoData["Email"],
                user_description: basicInfoData["Opis"],
            };
    
            // Filtrujemy tylko niepuste wartości i mapujemy na nowy obiekt
            const changedData = Object.entries(currentUserData).reduce((acc, [key, value]) => {
                // Jeśli wartość NIE jest pusta, dodajemy ją do obiektu wynikowego
                if (value !== "") {
                    acc[key] = value;
                }
                return acc;
            }, {} as Record<string, string>);

            // Jeśli nie ma żadnych zmian, zakończ funkcję
            if (Object.keys(changedData).length === 0) {
                console.log("Brak zmian do zapisania.");
                return;
            }

            // Dodaj ID użytkownika do danych
            const requestData = {
                ...changedData,
                id: basicInfoData["Id"]
            };

            // Wyślij tylko zmienione dane
            const response = await fetch(`/api/users/${requestData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
    
            if (!response.ok) {
                const responseText = await response.text();
                const errorMessage = responseText ? JSON.parse(responseText).message : "Błąd podczas aktualizacji danych";
                console.error("Błąd serwera:", errorMessage);
                throw new Error(errorMessage);
            }
    
            console.log("Dane podstawowe zostały zaktualizowane:", changedData);
            onClose();
    
        } catch (error) {
            console.error("Błąd podczas wysyłania danych podstawowych:", error);
        }
    };

    const handleContactsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const userResponse = await fetch('/api/me', {
                credentials: 'include'
            });
            if (!userResponse.ok) {
                throw new Error("Nie udało się pobrać danych użytkownika");
            }

            const userData = await userResponse.json();
            const userId = userData.id;
    
            const contactsData = [
                { name: "Portfolio", contact_info: contactData["Portfolio"] || "" },
                { name: "Linkedin", contact_info: contactData["Linkedin"] || "" },
                { name: "Instagram", contact_info: contactData["Instagram"] || "" },
                { name: "Dribbble", contact_info: contactData["Dribbble"] || "" },
                { name: "Inne", contact_info: contactData["Inne"] || "" }
            ]
            .filter(contact => contact.contact_info !== "" && contact.contact_info !== initialContactData[contact.name]);

            if (contactsData.length === 0) {
                console.log("Brak zmian w kontaktach.");
                return;
            }

            const contactsWithUserId = contactsData.map(contact => ({
                ...contact,
                user_id: userId
            }));

            console.log("Zmodyfikowane kontakty:", contactsWithUserId);

            const response = await fetch(`/api/users/${userId}/contacts`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(contactsWithUserId)
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                const errorData = errorText ? JSON.parse(errorText) : {};
                throw new Error(errorData.message || "Błąd podczas aktualizacji kontaktów");
            }
    
            const responseData = await response.json();
            console.log("Kontakty zostały zaktualizowane:", responseData);
            onClose();
    
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
                            <img src={profileImage || Community19} alt="profil-image" />
                            <div className="profile-popup__content--section--basic-info--profil--con">
                                <label htmlFor="profileImage" className="profile-popup__content--section--basic-info--profil--change-img">
                                    <GoPencil /> Zmień profilowe
                                </label>
                                <input 
                                    id="profileImage" 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleProfileImageChange}
                                    style={{ display: "none" }} 
                                />
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
                                    value={basicInfoData[id] || ""}
                                    onChange={handleBasicInfoChange}
                                    required={false}
                                />
                            ))} 
                            <div className="profile-popup__content--section--basic-info--textforminput">
                                <TextArea 
                                    id="Opis"
                                    label="Opis"
                                    value={basicInfoData["Opis"] || ""}
                                    onChange={handleBasicInfoChange}
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
                                    value={contactData[id] || ""}
                                    onChange={handleContactChange}
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