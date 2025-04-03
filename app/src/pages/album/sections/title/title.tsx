import './title.scss';
import StarRating from '../../../../components/reviews/starRating/starRating.tsx';

interface TitleProps {
    title?: string;
    description?: string;
}

function Title({ title = "", description = "" }: TitleProps) {
    return (
        <section className="head">
            <div className="head__details">
                <h1 className="head__details--h1">
                    {title || "Brak tytułu"}
                </h1>
                <div className="head__details--info">
                    <div className="head__details--info--rating">
                        4.7
                        <StarRating rating={4} readOnly={true}/>
                    </div>
                    15.06.2024
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