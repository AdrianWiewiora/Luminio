import "./albumpopup.scss";
import FormInput from "../../inputs/formInput/formInput.tsx";
import Submit from "../../btn/submit/submit.tsx";
import TextArea from "../../inputs/textarea/textArea.tsx";
import Checkbox from "../../inputs/checkbox/checkbox.tsx";
import { FaRegCircleXmark } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { paralax10 } from "../../../assets/img/imgExport.tsx";
import { useState, useEffect } from "react";
import { UpdateAlbumRequest } from "../../../../../common/requests/album_requests.ts";

interface AlbumPopupProps {
    onClose: () => void;
    userId: number;
    albumData?: {
        id: number;
        name: string;
        description: string;
        service_id: number;
        is_public: boolean;
    };
    onAlbumUpdated?: () => void;
    mode?: 'create' | 'edit';
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

function AlbumPopup({ 
    onClose, 
    userId, 
    albumData, 
    onAlbumUpdated,
    mode = 'create' 
}: AlbumPopupProps) {
    const [formData, setFormData] = useState<Omit<UpdateAlbumRequest, 'album_id'>>({
        user_id: userId,
        name: "",
        description: "",
        service_id: 0,
        is_public: true,
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (albumData) {
            setFormData({
                user_id: userId,
                name: albumData.name,
                description: albumData.description || "",
                service_id: albumData.service_id,
                is_public: albumData.is_public,
            });
        }
    }, [albumData, userId]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, name: e.target.value }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, description: e.target.value }));
    };

    const handleCheckboxChange = (serviceId: number, isChecked: boolean) => {
        setFormData(prev => ({ ...prev, service_id: isChecked ? serviceId : 0 }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        if (formData.service_id === 0) {
            setError("Proszę wybrać kategorię albumu");
            return;
        }
    
        if (!formData.name.trim()) {
            setError("Proszę podać tytuł albumu");
            return;
        }
    
        try {
            const requestData = {
                user_id: userId,
                name: formData.name.trim(),
                description: formData.description.trim(),
                service_id: formData.service_id,
                is_public: formData.is_public,
                tag: formData.service_id 
            };
    
            console.log('Wysyłane dane:', JSON.stringify(requestData, null, 2));
    
            const endpoint = (mode === 'edit' && albumData?.id) 
                ? `/api/albums/${albumData.id}`
                : '/api/albums';
    
            const response = await fetch(endpoint, {
                method: mode === 'edit' ? 'PUT' : 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                },
                credentials: 'include',
                body: JSON.stringify(requestData),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Pełna odpowiedź serwera:', {
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries()),
                    body: errorText
                });
                
                throw new Error(`Błąd serwera podczas ${mode === 'edit' ? 'aktualizacji' : 'tworzenia'} albumu (status ${response.status})`);
            }
    
            const responseData = await response.json();
            console.log('Sukces:', responseData);
    
            setSuccessMessage(`Album "${formData.name}" został ${mode === 'edit' ? 'zaktualizowany' : 'utworzony'}!`);
            setIsSuccess(true);
            
            onAlbumUpdated?.();
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
                        <div className="album-popup__content--img-section">
                            <h2 className="album-popup__content--img-section--title">
                                Okładka projektu
                            </h2>
                            <img src={paralax10} alt="album image" className="album-popup__content--img-section--img"/>
                            <span className="album-popup__content--img-section--change">
                                <GoPencil /> Zmień
                            </span>
                        </div>
                        {error && (
                            <div className="album-popup__error">
                                {error}
                            </div>
                        )}
                        <form className="album-popup__content--form" onSubmit={handleSubmit}>
                            <FormInput 
                                id="name" 
                                label="Tytuł projektu" 
                                type="text" 
                                value={formData.name}
                                onChange={handleNameChange}
                                required
                            />
                            <TextArea 
                                id="description" 
                                label="Opis" 
                                value={formData.description}
                                onChange={handleDescriptionChange}
                            />
                            {CheckboxOptions.map(({ id, title, serviceId }) => (
                                <Checkbox 
                                    key={id} 
                                    title={title} 
                                    checked={formData.service_id === serviceId}
                                    onChange={(isChecked: boolean) => handleCheckboxChange(serviceId, isChecked)}
                                />
                            ))}
                            <div className="album-popup__content--form--options">
                                <p onClick={onClose}> 
                                    Anuluj
                                </p>
                                <Submit title={mode === 'edit' ? "Zapisz zmiany" : "Utwórz album"} />
                            </div>
                        </form>
                    </>
                )}
            </div>
        </section>
    );
}

export default AlbumPopup;