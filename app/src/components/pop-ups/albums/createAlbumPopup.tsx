import "./albumPopup.scss";
import FormInput from "../../inputs/formInput/formInput.tsx";
import Submit from "../../btn/submit/submit.tsx";
import TextArea from "../../inputs/textarea/textArea.tsx";
import Checkbox from "../../inputs/checkbox/checkbox.tsx";
import { FaRegCircleXmark } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { paralax10 } from "../../../assets/img/imgExport.tsx";
import { useState, useEffect, useRef } from "react";
import { CreateAlbumRequest } from "../../../../../common/requests/album_requests.ts";

interface CreateAlbumPopupProps {
    onClose: () => void;
    userId: number;
    onAlbumCreated?: () => void;
}

interface CheckboxOption {
    id: string;
    title: string;
    serviceId: number;
}

const CheckboxOptions: CheckboxOption[] = [
    { id: "Wesele", title: "Wesele", serviceId: 1 },
    { id: "Artystyczne", title: "Artystyczne", serviceId: 2 },
    { id: "Sesja zdjęciowa", title: "Sesja zdjęciowa", serviceId: 3 },
    { id: "Rodzinne", title: "Rodzinne", serviceId: 4 },
];

function CreateAlbumPopup({ 
    onClose, 
    userId, 
    onAlbumCreated
}: CreateAlbumPopupProps) {
    const [formDataAlbum, setFormDataAlbum] = useState<Omit<CreateAlbumRequest, 'album_id'>>({
        user_id: userId,
        name: "",
        description: "",
        service_id: 0,
        is_public: true,
        file: paralax10,
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState<string | null>(null);
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormDataAlbum(prev => ({ ...prev, name: e.target.value }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormDataAlbum(prev => ({ ...prev, description: e.target.value }));
    };

    const handleCheckboxChange = (serviceId: number, isChecked: boolean) => {
        setFormDataAlbum(prev => ({ ...prev, service_id: isChecked ? serviceId : 0 }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formDataAlbum.service_id === 0) {
            setError("Proszę wybrać kategorię albumu");
            return;
        }
    
        if (!formDataAlbum.name.trim()) {
            setError("Proszę podać tytuł albumu");
            return;
        }

        try {
            const response = await fetch('/api/albums', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: JSON.stringify(formDataAlbum)
            });

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                const text = await response.text();
                throw new Error(text || `Status: ${response.status}`);
            }

            if (!response.ok) {
                throw new Error(data.message || `Błąd HTTP: ${response.status}`);
            }

            setIsSuccess(true);
            setSuccessMessage("Album został pomyślnie utworzony!");
            onAlbumCreated?.();
            setTimeout(onClose, 2000);
        } catch (error) {
            console.error('Pełny błąd:', error);
            setError(
                error instanceof Error 
                    ? error.message 
                    : "Wystąpił nieoczekiwany błąd"
            );
        }
    };

    return (
        <section className="album-popup" onClick={onClose}>
            <div className="album-popup__content" onClick={(e) => e.stopPropagation()}>
                <button className="album-popup__content--button" onClick={onClose}>
                    <FaRegCircleXmark className="album-popup__content--button--icon"/>
                </button>
                {isSuccess ? (
                    <div className="album-popup__success">
                        <h2>{successMessage}</h2>
                        <p>Okno zamknie się automatycznie...</p>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="album-popup__error">
                                {error}
                            </div>
                        )}
                        <form className="album-popup__content--form" onSubmit={handleSubmit}>
                            <div className="album-popup__content--form--img-section">
                                <h2 className="album-popup__content--form--img-section--title">
                                    Okładka projektu
                                </h2>
                                <img src={paralax10} alt="album image" className="album-popup__content--form--img-section--img"/>
                                <span className="album-popup__content--form--img-section--change">
                                    <GoPencil /> Zmień
                                </span>
                            </div>
                            <div className="album-popup__content--form--inputs">
                                <div className="album-popup__content--form--inputs--body">
                                    <FormInput 
                                        id="name" 
                                        label="Tytuł projektu" 
                                        type="text" 
                                        value={formDataAlbum.name}
                                        onChange={handleNameChange}
                                        required
                                    />
                                    <TextArea 
                                        id="description" 
                                        label="Opis" 
                                        value={formDataAlbum.description}
                                        onChange={handleDescriptionChange}
                                    />
                                    {CheckboxOptions.map(({ id, title, serviceId }) => (
                                        <Checkbox 
                                            key={id} 
                                            title={title} 
                                            checked={formDataAlbum.service_id === serviceId}
                                            onChange={(isChecked: boolean) => handleCheckboxChange(serviceId, isChecked)}
                                        />
                                    ))}
                                </div>
                                <div className="album-popup__content--form--inputs--options">
                                    <p onClick={onClose}> 
                                        Anuluj
                                    </p>
                                    <Submit title="Utwórz album" />
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </section>
    );
}

export default CreateAlbumPopup;