import { useState } from "react";
import "./photoGrid.scss";
import PicturePopup from "../../pop-ups/picture/picturePopup.tsx";

interface PhotoWithUrl {
  id: number;
  album_id: number;
  file_path: string;
  created_at: string;
  blobUrl: string;
  title?: string; // Dodane dla opisu zdjęcia
  description?: string; // Dodane dla opisu zdjęcia
}

interface PhotoGridProps {
  photos: PhotoWithUrl[];
}

function PhotoGrid({ photos }: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoWithUrl | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (photo: PhotoWithUrl) => {
    setSelectedPhoto(photo);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedPhoto(null);
  };

  if (photos.length === 0) {
    return <div className="photo-grid__empty">Brak zdjęć w albumie</div>;
  }

  return (
    <>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-grid__item" onClick={() => openPopup(photo)}>
            <img
              src={photo.blobUrl}
              alt={`Photo ${photo.id}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {isPopupOpen && selectedPhoto && (
        <PicturePopup 
          onClose={closePopup}
          photo={selectedPhoto} // Zmodyfikuj interfejs PicturePopupProps, aby przyjmował photo
        />
      )}
    </>
  );
}

export default PhotoGrid;