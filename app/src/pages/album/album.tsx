import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './album.scss';

import Header from '../../components/header/header.tsx';
import Banner from '../../components/banner/banner.tsx';
import Reviews from '../../components/reviews/reviews.tsx';
import Title from './sections/title/title.tsx';
import DynamicGrid from "../../components/ImgGrid/dynamicGrid/dynamicGrid.tsx";
import AsideManager from './sections/asideManager/asideManager.tsx';
import Footer from '../../components/footers/main/footer.tsx';

interface AlbumData {
    id: number;
    name: string;
    description: string;
    date: string;
    rating: number;
    isPublic: boolean;
    userId: number;
}

function Album() {
    const { id } = useParams();
    const [album, setAlbum] = useState<AlbumData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await fetch(`/api/albums/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setAlbum(data);
                }
            } catch (error) {
                console.error("Error fetching album:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbum();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!album) {
        return <div>Album not found</div>;
    }

    return (
        <main>
            <Header />
            <Banner />
            <div className="album-wrapper">
                <div className="album-wrapper__content">
                    <Title 
                        title={album.name} 
                        description={album.description} 
                    />
                    <Reviews />
                </div>
                <AsideManager />
            </div>
            <Footer />
        </main>
    );
}

export default Album;