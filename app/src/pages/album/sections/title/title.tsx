import './title.scss';
import StarRating from '../../../../components/reviews/starRating/starRating.tsx';
import { useState, useEffect } from 'react';

interface TitleProps {
  title?: string;
  description?: string;
  albumId: number | null;
}

function Title({ title = "", description = "", albumId }: TitleProps) {
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchAlbumReviews = async () => {
      const response = await fetch(`/api/albums/${albumId}/album_reviews`);
      const reviews = await response.json();

      if (reviews && reviews.length > 0) {
        const totalRating = reviews.reduce((sum: number, review: { value: number }) => sum + review.value, 0);
        const avgRating = totalRating / reviews.length;
        setAverageRating(avgRating);
      } else {
        setAverageRating(0);
      }
    };

    fetchAlbumReviews();
  }, [albumId]);

  return (
    <section className="head">
      <div className="head__details">
        <h1 className="head__details--h1">
          {title || "Brak tytułu"}
        </h1>

        <div className="head__details--info">
          <div className="head__details--info--rating">
            {averageRating !== null ? (
              <>
                {averageRating.toFixed(1)} <StarRating rating={averageRating} readOnly />
              </>
            ) : (
              "Ładowanie oceny..."
            )}
          </div>
        </div>
      </div>

      {description && (
        <p className="head__p">
          {description}
        </p>
      )}
    </section>
  );
}

export default Title;
