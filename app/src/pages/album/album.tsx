import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './album.scss';

import Header from '../../components/header/header.tsx';
import Banner from '../../components/banner/banner.tsx';
import Reviews from '../../components/reviews/reviews.tsx';
import Title from './sections/title/title.tsx';
import PhotoGrid from "../../components/ImgGrid/photoGrid/photoGrid.tsx";
import AsideManager from './sections/asideManager/asideManager.tsx';
import Footer from '../../components/footers/main/footer.tsx';

interface AlbumData {
  id: number;
  name: string;
  description: string;
  date: string;
  rating: number;
  isPublic: boolean;
  userId: number;
}

interface Photo {
  id: number;
  album_id: number;
  file_path: string;
  created_at: string;
}

interface PhotoWithUrl extends Photo {
  blobUrl: string;
}

function Album() {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<PhotoWithUrl[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const amountPerPage = 10;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/me');
        if (response.ok) {
          const userData = await response.json();
          setUserId(userData.id);
        } else {
          console.error('Błąd pobierania danych użytkownika');
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych użytkownika:", error);
      }
    };

    const fetchAlbum = async () => {
      try {
        if (!id) return;

        const response = await fetch(`/api/albums/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAlbum(data);
        }
      } catch (error) {
        console.error("Error fetching album:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchAlbum();
  }, [id]);

  const fetchPhotosPage = async (currentPage: number) => {
    try {
      if (!id) return;

      const response = await fetch(`/api/albums/${id}/photos?amount=${amountPerPage}&page=${currentPage}`);
      if (!response.ok) throw new Error(`Nie udało się pobrać zdjęć (page ${currentPage})`);

      const data = await response.json();
      const photosList = Array.isArray(data) ? data : (data ? [data] : []);

      if (photosList.length === 0) {
        setHasMore(false);
        return;
      }

      const loadedPhotos = await Promise.all(
        photosList.map(async (photo) => {
          try {
            const imgResponse = await fetch(`/api/photos/${photo.id}`);
            if (!imgResponse.ok) throw new Error(`Błąd pobierania zdjęcia ${photo.id}`);
            const blob = await imgResponse.blob();
            const blobUrl = URL.createObjectURL(blob);
            return { ...photo, blobUrl };
          } catch (error) {
            console.error(`Błąd przy zdjęciu ${photo.id}:`, error);
            return null;
          }
        })
      );

      const validPhotos = loadedPhotos.filter((photo): photo is PhotoWithUrl => photo !== null);
      setPhotos(prev => [...prev, ...validPhotos]);

      if (photosList.length < amountPerPage) {
        setHasMore(false);
      }

    } catch (error) {
      console.error("Błąd podczas pobierania zdjęć:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPhotosPage(1);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <main>
      <Header />
      <Banner />
      <div className="album-wrapper">
        <div className="album-wrapper__content">
          <Title title={album.name} description={album.description} />
          <PhotoGrid photos={photos} />
          
          {hasMore && (
            <button 
              className="load-more-button" 
              onClick={() => {
                const nextPage = page + 1;
                setPage(nextPage);
                fetchPhotosPage(nextPage);
              }}
            >
              Załaduj więcej
            </button>
          )}

          <Reviews />
        </div>
        {id && userId && <AsideManager albumId={id} userId={userId} />}
      </div>
      <Footer />
    </main>
  );
}

export default Album;
