import './reviews.scss';
import { useState } from 'react';
import profile from '../../../../assets/img/community/community13.png';
import Review from '../../../../components/review/review'
import StarRating from '../../../../components/review/starRating/starRating';

function Reviews(){
    const [rating, setRating] = useState(0);
    
    return (
        <section className="reviews">
            <div className="reviews__new-review">
                <div className="reviews__new-review--writebox">
                    <img src={profile} alt="profile" className="reviews__new-review--writebox--profile" />
                    <textarea 
                        className="reviews__new-review--writebox--input" 
                        placeholder="Wystaw ocenę..."
                    />
                </div>
                <div className="reviews__new-review--else">
                    <StarRating rating={rating} onChange={setRating} />
                    <span className="reviews__new-review--else--submit">Dodaj komentarz</span>
                </div>
            </div>
            <div className="reviews__grid">
                <Review />
                <Review />
                <Review />
            </div>
        </section>
    );
}

export default Reviews;