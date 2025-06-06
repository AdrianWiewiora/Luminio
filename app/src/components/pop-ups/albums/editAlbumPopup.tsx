import "./albumPopup.scss";
import FormInput from "../../inputs/formInput/formInput.tsx";
import Submit from "../../btn/submit/submit.tsx";
import TextArea from "../../inputs/textarea/textArea.tsx";
import Checkbox from "../../inputs/checkbox/checkbox.tsx";
import { FaRegCircleXmark } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { paralax10 } from "../../../assets/img/imgExport.tsx";
import { useState, useRef } from "react";
import { UpdateAlbumRequest } from "../../../../../common/requests/album_requests.ts";

interface AlbumEditPopupProps {
    onClose: () => void;
    userId: number;
    albumData: {
        id: number;
        name: string;
        description: string;
        service_id: number;
        is_public: boolean;
        cover_image?: string;
    };
    onAlbumUpdated?: () => void;
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

function AlbumEditPopup({ 
    onClose, 
    userId, 
    albumData, 
    onAlbumUpdated
}: AlbumEditPopupProps) {
    const [formData, setFormData] = useState<Omit<UpdateAlbumRequest, 'album_id'> & { file: File | null }>({
        user_id: userId,
        name: albumData.name,
        description: albumData.description,
        service_id: albumData.service_id,
        is_public: albumData.is_public,
        file: null
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState(albumData.cover_image || paralax10);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, file }));
            setPreview(URL.createObjectURL(file));
        }
    };

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
            const formDataToSend = new FormData();
            formDataToSend.append("user_id", userId.toString());
            formDataToSend.append("name", formData.name);
            formDataToSend.append("description", formData.description || "");
            formDataToSend.append("service_id", formData.service_id.toString());
            formDataToSend.append("is_public", formData.is_public.toString());
            
            if (formData.file) {
                formDataToSend.append("file", formData.file);
            }

            console.log("Dane formularza:", {
                user_id: userId,
                name: formData.name,
                description: formData.description,
                service_id: formData.service_id,
                is_public: formData.is_public,
                file: formData.file?.name
            });
    
            const response = await fetch(`/api/albums/${albumData.id}`, {
                method: 'PUT',
                body: formDataToSend,
                credentials: 'include'
            });
    
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Błąd HTTP: ${response.status}`);
            }
    
            setSuccessMessage(`Album "${formData.name}" został zaktualizowany!`);
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
                                <img src={preview} alt="album image" className="album-popup__content--form--img-section--img"/>
                                <span onClick={() => fileInputRef.current?.click()} className="album-popup__content--form--img-section--change">
                                    <GoPencil /> Zmień okładkę
                                </span>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <div className="album-popup__content--form--inputs">
                                <div className="album-popup__content--form--inputs--body">
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
                                </div>
                                <div className="album-popup__content--form--inputs--options">
                                    <p onClick={onClose}> 
                                        Anuluj
                                    </p>
                                    <Submit title="Zapisz zmiany" />
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </section>
    );
}

export default AlbumEditPopup;