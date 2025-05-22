import './reviews.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import noProfileImage from '../../assets/img/noprofileimage.png';
import SingleReview from './singleReview/singleReview.tsx';
import StarRating from './starRating/starRating.tsx';

interface ReviewData {
  id: number;
  user_id: number;
  album_id: number;
  body: string;
  value: number;
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

function Reviews() {
  const { id } = useParams();
  const albumId = Number(id);
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState('');
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (!albumId) return;
    
    fetch(`/api/albums/${albumId}/album_reviews`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error('Błąd przy pobieraniu recenzji:', err));

    fetch('/api/me', {
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) return res.json();
        return null;
      })
      .then(data => setCurrentUser(data))
      .catch(err => console.error('Błąd przy pobieraniu danych użytkownika:', err));
  }, [albumId]);

  const checkIfReviewExists = async (userId: number) => {
    try {
      const reviewsResponse = await fetch(`/api/albums/${albumId}/album_reviews`);
      const reviewsData = await reviewsResponse.json();
      return reviewsData.some((review: { user_id: number }) => review.user_id === userId);
    } catch (err) {
      console.error('Błąd przy sprawdzaniu recenzji użytkownika:', err);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      alert('Użytkownik nie jest zalogowany');
      return;
    }

    try {
      const reviewExists = await checkIfReviewExists(currentUser.id);
      if (reviewExists) {
        alert('Już dodałeś recenzję do tego albumu.');
        return;
      }

      const response = await fetch('/api/album_reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUser.id,
          album_id: albumId,
          body,
          value: rating,
        }),
      });

      if (response.ok) {
        setBody('');
        setRating(0);
        const newReviews = await fetch(`/api/albums/${albumId}/album_reviews`).then(r => r.json());
        setReviews(newReviews);
      } else {
        const error = await response.json();
        alert(error.message || 'Błąd przy dodawaniu komentarza');
      }
    } catch (err) {
      console.error('Błąd przy dodawaniu recenzji:', err);
      alert('Wystąpił błąd podczas próby dodania recenzji.');
    }
  };

  if (!albumId) {
    return <div>Niepoprawne ID albumu</div>;
  }

  return (
    <section className="reviews">
      {currentUser && (
        <div className="reviews__new-review">
          <div className="reviews__new-review--writebox">
            <img 
              src={currentUser.avatar_url || noProfileImage} 
              alt="profile" 
              className="reviews__new-review--writebox--profile" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = noProfileImage;
              }}
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="reviews__new-review--writebox--input"
              placeholder="Treść komentarza..."
            />
          </div>
          <div className="reviews__new-review--else">
            <StarRating rating={rating} onChange={setRating} />
            <span
              className="reviews__new-review--else--submit"
              onClick={handleSubmit}
            >
              Dodaj komentarz
            </span>
          </div>
        </div>
      )}

      <div className="reviews__grid">
        {reviews.map((review) => (
          <SingleReview
            key={review.id}
            author={`${review.first_name} ${review.last_name}`}
            rating={review.value}
            date={new Date().toLocaleDateString()}
            content={review.body}
            avatarUrl={review.avatar_url}
          />
        ))}
      </div>
    </section>
  );
}

export default Reviews;