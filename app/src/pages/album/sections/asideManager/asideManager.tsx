import { useState, useEffect } from 'react';
import { TbPhotoPlus } from "react-icons/tb";
import './asideManager.scss';

interface AsideManagerProps {
    albumId: string;
    userId: string;
    onPhotosUploaded: () => void;
}

function AsideManager({ albumId, userId, onPhotosUploaded }: AsideManagerProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const res = await fetch(`/api/albums/${albumId}`);
                if (!res.ok) throw new Error('Nie udało się pobrać albumu');
                const album = await res.json();
                setIsOwner(album.user_id === Number(userId));
            } catch (err) {
                console.error(err);
            }
        };
        fetchAlbum();
    }, [albumId, userId]);

    const handleAddPhotos = async (files: FileList) => {
        if (!files || files.length === 0) {
            setUploadError('Proszę wybrać pliki');
            return;
        }

        setIsUploading(true);
        setUploadError(null);
        setUploadSuccess(false);

        try {
            for (const file of Array.from(files)) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('album_id', albumId);
                formData.append('category_id', '1');
                formData.append('user_id', userId);

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
            }

            setUploadSuccess(true);
            onPhotosUploaded();
            globalThis.dispatchEvent(new Event('photos-updated'));
        } catch (error) {
            console.error(error);
            setUploadError(error instanceof Error ? error.message : 'Wystąpił nieoczekiwany błąd podczas przesyłania');
        } finally {
            setIsUploading(false);
        }
    };

    const triggerFileInput = () => {
        if (isUploading) return;
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.onchange = (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (files && files.length > 0) {
                handleAddPhotos(files);
            }
        };
        input.click();
    };

    return (
    <aside className="container">
        <div className="container__sticky">
        <div className="container__sticky--section">
            {isOwner && (
            <>
                <h2 className="container__sticky--section--h2">Dodaj zawartość</h2>

                <div
                className={`container__sticky--section--item ${isUploading ? 'uploading' : ''}`}
                onClick={triggerFileInput}
                style={{ cursor: isUploading ? 'not-allowed' : 'pointer' }}
                aria-disabled={isUploading}
                >
                <TbPhotoPlus className="container__sticky--section--item--icon" />
                {isUploading ? 'Przesyłanie...' : 'Dodaj zdjęcia'}
                </div>

                {uploadError && <div className="upload-status error">{uploadError}</div>}
                {uploadSuccess && <div className="upload-status success">Zdjęcia zostały pomyślnie dodane!</div>}
            </>
            )}
        </div>
        </div>
    </aside>
    );
}

export default AsideManager;
