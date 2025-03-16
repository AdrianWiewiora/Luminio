import "./starRating.scss";
import { useState } from 'react';

type StarRatingProps = {
    rating: number;
    onChange?: (rating: number) => void;
    readOnly?: boolean;
}


function StarRating({ rating, onChange, readOnly = false }: StarRatingProps) {
    const [hoveredStars, setHoveredStars] = useState(0);
    const [animatedStar, setAnimatedStar] = useState<number | null>(null);

    const handleClick = (starIndex: number) => {
        if (!readOnly) {
            setAnimatedStar(starIndex);
            onChange?.(starIndex);
            setTimeout(() => setAnimatedStar(null), 300);
        }
    };

    return (
        <div className="starRating-container">
            {[...Array(5)].map((_, index) => {
                const starIndex = index + 1;
                const isFilled = starIndex <= (hoveredStars || rating);
                const isAnimated = starIndex === (animatedStar || rating);
                return (
                    <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className={`star ${isAnimated ? 'star--animated' : ''}`}
                        style={{ cursor: readOnly ? 'default' : 'pointer' }}
                        onMouseEnter={() => !readOnly && setHoveredStars(starIndex)}
                        onMouseLeave={() => !readOnly && setHoveredStars(0)}
                        onClick={() => handleClick(starIndex)}
                    >
                        <path
                            d="M12 2L14.66 8.47L21.8 9.24L16.4 13.94L17.83 21L12 17.56L6.17 21L7.6 13.94L2.2 9.24L9.34 8.47L12 2Z"
                            stroke="#D1C1A9"
                            strokeWidth="2"
                            fill={isFilled ? "#D1C1A9" : "transparent"}
                        />
                    </svg>
                );
            })}
        </div>
    );
}

export default StarRating;
