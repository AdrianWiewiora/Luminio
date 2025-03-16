import "./gallery.scss";

import Header from "../../components/header/header";
import Discover from "./sections/discover";
import AuthorTile from "../../components/authorTile/authorTile";

function Gallery(){
    return(
        <div>
            <Header />
            <Discover />
            <AuthorTile />
        </div>
    );
}

export default Gallery;