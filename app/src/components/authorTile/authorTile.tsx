import "./authorTile.scss";
import { Community1 } from "../../assets/img/imgExport.tsx";

function AuthorTile() {
    return(
        <div className="author-tile">
            <div className="author-tile__banner">

            </div>
            <div className="author-tile__profile">
                <img src={Community1} alt="Community" className="author-tile__profile--img"/>
                <h2 className="author-tile__profile--name">
                    Adam Kowalski
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