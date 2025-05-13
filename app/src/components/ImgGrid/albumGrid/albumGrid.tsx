import { Link } from "react-router-dom";
import "./albumGrid.scss";
import AlbumElement from "../../album/albumElement.tsx";

interface Album {
    id: number;
    user_id: number;
    name: string;
    description?: string;
    service_id?: number;
    is_public: boolean;
    cover_id: number;
}

interface AlbumGridProps {
    albums: Album[];
    loggedUserId?: number | null;
    onEditClick?: (albumId: number) => void;
    onDeleteClick?: (albumId: number) => void;
}

const AlbumGrid = ({ albums, loggedUserId, onEditClick, onDeleteClick }: AlbumGridProps) => {
    return (
        <section className="grid-album-container">
            {albums.map((album) => (
                <div key={album.id} className="grid-album-container__item">
                    <AlbumElement
                        albumId={album.id}
                        title={album.name}
                        isPublic={album.is_public}
                        userId={album.user_id}
                        loggedUserId={loggedUserId}
                        description={album.description}
                        serviceId={album.service_id}
                        coverId={album.cover_id}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                    />
                </div>
            ))}
        </section>
    );
};

export default AlbumGrid;