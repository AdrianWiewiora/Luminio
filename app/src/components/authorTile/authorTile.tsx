import "./authorTile.scss";
import { Community1 } from "../../assets/img/imgExport";

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
                
            </div>
        </div>
    );
}

export default AuthorTile;