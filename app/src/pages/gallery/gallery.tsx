import { useState, useEffect } from 'react';
import "./gallery.scss";

import Header from "../../components/header/header.tsx";
import Discover from "./sections/discover.tsx";
import AuthorTile from "../../components/authorTile/authorTile.tsx";
import Footer from "../../components/footers/main/footer.tsx";
import DynamicGrid from "../../components/ImgGrid/dynamicGrid/dynamicGrid.tsx";
import AlbumElement from "../../components/album/albumElement.tsx";

interface Author {
    id: number;
    first_name: string;
    last_name: string;
    average_rating: number;
    reviews_count: number;
    comment_count: number;
    avatar_url: number;
    album_count: number;
}

type SelectedView = 'photos' | 'albums' | 'authors';

function Gallery() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [selectedView, setSelectedView] = useState<SelectedView>('photos');

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('/api/users');
                if (response.ok) {
                    const data = await response.json();
                    setAuthors(data);
                }
            } catch (error) {
                console.error("Błąd podczas pobierania listy autorów:", error);
            }
        };

        fetchAuthors();
    }, []);

    const handleViewChange = (view: SelectedView) => {
        setSelectedView(view);
    };

    return (
        <div>
            <Header />
            <Discover onViewChange={handleViewChange} />
            <div className="gallery-content">
                <DynamicGrid view={selectedView} authors={authors} />
            </div>
            <Footer />
        </div>
    );
}

export default Gallery;