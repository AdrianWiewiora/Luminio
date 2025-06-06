import { useState, useEffect, useCallback } from 'react';
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
  comment_count: number;
  avatar_url: number;
  album_count: number;
}

interface Album {
  id: number;
  title: string;
  cover_id: number;
  user_id: number;
}

interface Photo {
  id: number;
  file_id: number;
  album_id: number;
  user_id: number;
}

interface DynamicGridProps {
  view: 'photos' | 'albums' | 'authors';
  authors: Author[];
}

const DynamicGrid = ({ view, authors }: DynamicGridProps) => {
  const [items, setItems] = useState<GridItem[]>([]);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 10;

  const typeMap = {
    photos: 'photo',
    albums: 'album',
    authors: 'author',
  };

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

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      
      // Pobierz zdjęcia z paginacją
      const photosResponse = await fetch(`/api/photos?amount=${itemsPerPage}&page=${page}`);
      const photosData = photosResponse.ok ? await photosResponse.json() : [];
      
      // Pobierz albumy
      const albumsResponse = await fetch('/api/albums');
      const albumsData = albumsResponse.ok ? await albumsResponse.json() : [];

      const newItems: GridItem[] = [
        ...photosData.map((photo: Photo) => ({
          type: 'photo',
          data: {
            ...photo,
            id: photo.file_id
          },
        })),
        ...albumsData.map((album: Album) => ({
          type: 'album',
          data: album,
        })),
        ...authors.map((author: Author) => ({
          type: 'author',
          data: author,
        })),
      ];

      const filteredItems = newItems.filter(item => item.type === typeMap[view]);
      
      setItems(prev => page === 1 ? filteredItems : [...prev, ...filteredItems]);
      setHasMore(filteredItems.length > 0);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    } finally {
      setLoading(false);
    }
  }, [view, authors, page]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !== 
        document.documentElement.offsetHeight || 
        loading || 
        !hasMore ||
        view !== 'photos'
      ) {
        return;
      }
      setPage(prev => prev + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, view]);

  if (loading && page === 1) {
    return <div>Ładowanie...</div>;
  }

  return (
    <section className="grid-container-dynamic">
      {items.map((item, index) => (
        <div key={`${item.type}-${item.data.id}-${index}`} className="grid-container-dynamic__grid-item-dynamic">
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
              userId={item.data.user_id}
              loggedUserId={userData?.id}
            />
          )}
          {item.type === 'author' && (
            <AuthorTile
              authorId={item.data.id}
              name={`${item.data.first_name} ${item.data.last_name}`}
              averageRating={item.data.average_rating ? parseFloat(item.data.average_rating) : null}
              reviewsCount={item.data.reviews_count || 0}
              commentsCount={item.data.comment_count || 0}
              avatarUrl={item.data.avatar_url}
              albumCount={item.data.album_count}
            />
          )}
        </div>
      ))}
      {loading && page > 1 && <div>Ładowanie kolejnych zdjęć...</div>}
    </section>
  );
};

export default DynamicGrid;