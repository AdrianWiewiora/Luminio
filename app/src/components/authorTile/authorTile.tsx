import "./authorTile.scss";
import { Community1 } from "../../assets/img/imgExport.tsx";
import { useNavigate } from 'react-router-dom';

interface AuthorTileProps {
    authorId: number;
    name: string;
    averageRating?: number | null;
    reviewsCount?: number;
    commentsCount?: number;
}

function AuthorTile({ authorId, name, averageRating, reviewsCount, commentsCount }: AuthorTileProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/author/${authorId}`);
    };

    return (
        <div className="author-tile" onClick={handleClick}> 
            <div className="author-tile__banner"></div>
            <div className="author-tile__profile">
                <img src={Community1} alt="Community" className="author-tile__profile--img"/>
                <h2 className="author-tile__profile--name">
                    {name} 
                </h2>
            </div>
            <div className="author-tile__author-data">
                <div className="author-tile__author-data--single-info">
                    <p>
                        {averageRating !== undefined && averageRating !== null 
                            ? averageRating.toFixed(1) 
                            : 'Brak'}
                    </p>
                    <p>Ocena</p>
                </div>
                <div className="author-tile__author-data--single-info">
                    <p>{commentsCount || '0'}</p>
                    <p>Komentarze</p>
                </div>
                <div className="author-tile__author-data--single-info">
                    <p>{reviewsCount || '0'}</p>
                    <p>Albumy</p>
                </div>
            </div>
        </div>
    );
}

export default AuthorTile;