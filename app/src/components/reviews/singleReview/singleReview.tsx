import './singleReview.scss';
import { FC } from 'react';
import profile from '../../../assets/img/community/community9.png';
import StarRating from '../starRating/starRating.tsx';

interface SingleReviewProps {
  author: string;
  rating: number;
  date: string;
  content: string;
}

const SingleReview: FC<SingleReviewProps> = ({ author, rating, date, content }) => {
  return (
    <div className="review">
      <div className="review__head">
        <div className="review__head--user">
          <img src={profile} alt="profile" className="review__head--user--profile" />
          <h1 className="review__head--user--h1">
            {author}
          </h1>
        </div>
        <div className="review__head--info">
          <StarRating rating={rating} readOnly={true} />
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
