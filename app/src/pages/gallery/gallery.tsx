import "./gallery.scss";

import Header from "../../components/header/header.tsx";
import Discover from "./sections/discover.tsx";
import AuthorTile from "../../components/authorTile/authorTile.tsx";

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