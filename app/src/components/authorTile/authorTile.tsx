import "./authorTile.scss";
import { Community1 } from "../../assets/img/imgExport.tsx";
import { useNavigate } from 'react-router-dom'; 

interface AuthorTileProps {
    authorId: number; 
    name: string; 
}

function AuthorTile({ authorId, name }: AuthorTileProps) {
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
                    <p>4.7</p>
                    <p>Ocena</p>
                </div>
                <div className="author-tile__author-data--single-info">
                    <p>134</p>
                    <p>Opinie</p>
                </div>
                <div className="author-tile__author-data--single-info">
                    <p>15</p>
                    <p>Komentarze</p>
                </div>
            </div>
        </div>
    );
}

export default AuthorTile;