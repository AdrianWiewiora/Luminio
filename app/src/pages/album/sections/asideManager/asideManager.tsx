import { useState } from 'react';
import { TbPhotoPlus } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import Submit from '../../../../components/btn/submit/submit.tsx';
import './asideManager.scss';

interface AsideManagerProps {
    albumId: string;
    userId: string; 
}

function AsideManager({ albumId, userId }: AsideManagerProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleAddPhoto = async (file: File) => {
        if (!file) {
            setUploadError('Proszę wybrać plik');
            return;
        }
    
        setIsUploading(true);
        setUploadError(null);
        setUploadSuccess(false);
    
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('album_id', albumId);
            formData.append('category_id', '1');
            formData.append('user_id', userId); 
    
            console.log('Wysyłane dane:', {
                file: file.name,
                album_id: albumId,
                category_id: '1',
                user_id: userId
            });
    
            const response = await fetch('/api/photos', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
    
            if (!response.ok) {
                const text = await response.text();
                try {
                    const errorData = JSON.parse(text);
                    console.error('Pełna odpowiedź serwera:', errorData);
                    if (errorData.issues) {
                        const messages = errorData.issues.map((issue: any) =>
                            `${issue.path?.join('.') || 'field'}: ${issue.message}`
                        ).join(', ');
                        throw new Error(`Błędy walidacji: ${messages}`);
                    }
                    throw new Error(errorData.error || 'Nie udało się przesłać zdjęcia');
                } catch {
                    throw new Error(text || 'Nie udało się przesłać zdjęcia');
                }
            }
    
            setUploadSuccess(true);
            window.dispatchEvent(new Event('photos-updated'));
        } catch (error) {
            console.error('Całkowity błąd:', error);
            setUploadError(
                error instanceof Error
                    ? error.message
                    : 'Wystąpił nieoczekiwany błąd podczas przesyłania'
            );
        } finally {
            setIsUploading(false);
        }
    };

    const triggerFileInput = () => {
        if (isUploading) return;

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = false;
        input.onchange = (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (files && files.length > 0) {
                handleAddPhoto(files[0]);
            }
        };
        input.click();
    };

    return (
        <aside className="container">
            <div className="container__sticky">
                <div className="container__sticky--section">
                    <h2 className="container__sticky--section--h2">
                        Dodaj zawartość
                    </h2>
                    <div 
                        className={`container__sticky--section--item ${isUploading ? 'uploading' : ''}`} 
                        onClick={triggerFileInput}
                        style={{ cursor: isUploading ? 'not-allowed' : 'pointer' }}
                        aria-disabled={isUploading}
                    >
                        <TbPhotoPlus className="container__sticky--section--item--icon" />
                        {isUploading ? 'Przesyłanie...' : 'Dodaj zdjęcie'}
                    </div>
                    
                    {uploadError && (
                        <div className="upload-status error">
                            {uploadError}
                        </div>
                    )}
                    {uploadSuccess && (
                        <div className="upload-status success">
                            Zdjęcie zostało pomyślnie dodane!
                        </div>
                    )}
                </div>
                <div className="container__sticky--btn">
                    <Submit title={"Zapisz projekt"} />
                </div>
            </div>
        </aside>
    );
}

export default AsideManager;
