import "./photoGrid.scss";

interface PhotoWithUrl {
  id: number;
  album_id: number;
  file_path: string;
  created_at: string;
  blobUrl: string;
}

interface PhotoGridProps {
  photos: PhotoWithUrl[];
}

function PhotoGrid({ photos }: PhotoGridProps) {
  if (photos.length === 0) {
    return <div className="photo-grid__empty">Brak zdjęć w albumie</div>;
  }

  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <div key={photo.id} className="photo-grid__item">
          <img
            src={photo.blobUrl}
            alt={`Photo ${photo.id}`}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export default PhotoGrid;
