import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./dynamicGrid.scss";
import AlbumElement from "../../album/albumElement.tsx";
import AuthorTile from "../../authorTile/authorTile.tsx";

type GridItem = {
  type: 'photo' | 'album' | 'author';
  data: any;
};

interface Author {
  id: number;
  first_name: string;
  last_name: string;
  average_rating: number;
  reviews_count: number;
  comments_count: number;
}

interface Album {
  id: number;
  title: string;
  cover_id: number;
}

interface Photo {
  id: number;
  file_path: string;
  album_id: number;
}

interface DynamicGridProps {
  view: 'photos' | 'albums' | 'authors';
  authors: Author[];
}

const DynamicGrid = ({ view, authors }: DynamicGridProps) => {
  const [items, setItems] = useState<GridItem[]>([]);
  const [userData, setUserData] = useState<any | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/me');
        if (response.ok) {
          const user = await response.json();
          setUserData(user);  
        }
      } catch (error) {
        console.error('Błąd podczas pobierania danych użytkownika:', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/api/photos');
        if (response.ok) {
          const photosData = await response.json();
          setPhotos(photosData);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania zdjęć:', error);
      }
    };
    fetchPhotos();
  }, []);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('/api/albums');
        if (response.ok) {
          const albums = await response.json();

          const allItems: GridItem[] = [
            ...photos.map((photo: Photo) => ({
              type: 'photo',
              data: photo,
            })),
            ...albums.map((album: Album) => ({
              type: 'album',
              data: album,
            })),
            ...authors.map((author: Author) => ({
              type: 'author',
              data: author,
            })),
          ];

          const typeMap = {
            photos: 'photo',
            albums: 'album',
            authors: 'author',
          };

          const filteredItems = allItems.filter(item => item.type === typeMap[view]);

          setItems(filteredItems);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania albumów:', error);
      }
    };
    fetchAlbums();
  }, [view, authors, photos]);

  if (userData === null) {
    return <div>Ładowanie...</div>;
  }

  return (
    <section className="grid-container-dynamic">
      {items.map((item, index) => (
        <div key={index} className="grid-container-dynamic__grid-item-dynamic">
          {item.type === 'photo' && (
            <Link to={`/album/${item.data.album_id}`}>
              <img
                src={`/api/files/${item.data.id}`}
                alt={`Zdjęcie ${item.data.id}`}
                loading="lazy"
                className="grid-container-dynamic__grid-item-dynamic--img"
              />
            </Link>
          )}
          {item.type === 'album' && (
            <AlbumElement
              albumId={item.data.id}
              title={item.data.title}
              coverId={item.data.cover_id}
              isPublic
              userId={userData.id} 
              loggedUserId={userData.id}
            />
          )}
        {item.type === 'author' && (
            <AuthorTile
                authorId={item.data.id}
                name={`${item.data.first_name} ${item.data.last_name}`}
                averageRating={item.data.average_rating ? parseFloat(item.data.average_rating) : null}
                reviewsCount={item.data.album_count ? parseInt(item.data.album_count) : 0}
                commentsCount={item.data.comment_count ? parseInt(item.data.comment_count) : 0}
            />
        )}
        </div>
      ))}
    </section>
  );
};

export default DynamicGrid;
