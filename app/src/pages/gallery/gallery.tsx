import { useState, useEffect } from 'react';
import "./gallery.scss";

import Header from "../../components/header/header.tsx";
import Discover from "./sections/discover.tsx";
import AuthorTile from "../../components/authorTile/authorTile.tsx";
import Footer from "../../components/footers/main/footer.tsx";

interface Author {
    id: number;
    first_name: string;
    last_name: string;
}

function Gallery() {
    const [authors, setAuthors] = useState<Author[]>([]); 

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

    return (
        <div>
            <Header />
            <Discover />
            {authors.map((author) => (
                <AuthorTile 
                    key={author.id} 
                    authorId={author.id} 
                    name={`${author.first_name} ${author.last_name}`} 
                />
            ))}
            <Footer />
        </div>
    );
}

export default Gallery;