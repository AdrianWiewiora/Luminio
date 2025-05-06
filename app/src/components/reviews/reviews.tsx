import './reviews.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import profile from '../../assets/img/community/community13.png';
import SingleReview from './singleReview/singleReview.tsx';
import StarRating from './starRating/starRating.tsx';

function Reviews() {
    const { id } = useParams();
    const albumId = Number(id);
    const [rating, setRating] = useState(0);
    const [body, setBody] = useState('');
    const [reviews, setReviews] = useState([]);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        if (!albumId) return;
        fetch(`/api/albums/${albumId}/album_reviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error('Błąd przy pobieraniu recenzji:', err));
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

        try {
            const userResponse = await fetch('/api/users/me', {
                method: 'GET',
                credentials: 'include', // ciasteczka
            });

            if (!userResponse.ok) {
                console.error('Błąd przy pobieraniu danych użytkownika');
                alert('Użytkownik nie jest zalogowany');
                return;
            }

            const userData = await userResponse.json();
            const userId = userData.id;

            // Jeśli użytkownik nie jest zalogowany
            if (!userId) {
                alert('Użytkownik nie jest zalogowany');
                return;
            }

            // Sprawdzamy czy użytkownik już dodał recenzję
            const reviewExists = await checkIfReviewExists(userId);
            if (reviewExists) {
                alert('Już dodałeś recenzję do tego albumu.');
                return;
            }

            const response = await fetch('/api/album_reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
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
            console.error('Błąd przy logowaniu lub dodawaniu recenzji:', err);
            alert('Wystąpił błąd podczas próby dodania recenzji.');
        }
    };

    if (!albumId) {
        return <div>Niepoprawne ID albumu</div>;
    }

    return (
        <section className="reviews">
            <div className="reviews__new-review">
                <div className="reviews__new-review--writebox">
                    <img src={profile} alt="profile" className="reviews__new-review--writebox--profile" />
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
            <div className="reviews__grid">
                {reviews.map((review) => (
                    <SingleReview
                        key={review.id}
                        author={review.user_id}
                        rating={review.value}
                        date={new Date().toLocaleDateString()}
                        content={review.body}    
                    />
                ))}
            </div>
        </section>
    );
}

export default Reviews;