import "./gallery.scss";

import Header from "../../components/header/header.tsx";
import Discover from "./sections/discover.tsx";
import AuthorTile from "../../components/authorTile/authorTile.tsx";
import Footer from "../../components/footers/main/footer.tsx";

function Gallery(){
    return(
        <div>
            <Header />
            <Discover />
            <AuthorTile />
            <Footer />
        </div>
    );
}

export default Gallery;