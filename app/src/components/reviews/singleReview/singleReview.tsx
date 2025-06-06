import './singleReview.scss';
import { FC } from 'react';
import noProfileImage from '../../../assets/img/noprofileimage.png';
import StarRating from '../starRating/starRating.tsx';

interface SingleReviewProps {
  author: string;
  rating: number;
  date: string;
  content: string;
  avatarUrl?: string;
}

const SingleReview: FC<SingleReviewProps> = ({ author, rating, date, content, avatarUrl }) => {
  return (
    <div className="review">
      <div className="review__head">
        <div className="review__head--user">
          <img 
            src={avatarUrl || noProfileImage} 
            alt="profile" 
            className="review__head--user--profile"
            onError={(e) => {
              (e.target as HTMLImageElement).src = noProfileImage;
            }}
          />
          <h1 className="review__head--user--h1">
            {author}
          </h1>
        </div>
        <div className="review__head--info">
          <StarRating rating={rating} readOnly />
          <h2 className="review__head--info--date">
            {date}
          </h2>
        </div>
      </div>
      <p className="review__content">
        {content}
      </p>
    </div>
  );
};

export default SingleReview;