import { useState, useEffect } from 'react';
import "./dynamicGrid.scss";
import { image1, image2, image3, image4, image5, image6, image7, image8 } from "../../../assets/img/imgExport.tsx";
import AlbumElement from "../../album/albumElement.tsx";
import AuthorTile from "../../authorTile/authorTile.tsx";

type GridItem = {
    type: 'photo' | 'album' | 'author';
    data: any;
};

interface Author {
    id: number;
    first_name: string;
    last_name: string;
}

interface DynamicGridProps {
    view: 'photos' | 'albums' | 'authors';
    authors: Author[];
}

const DynamicGrid = ({ view, authors }: DynamicGridProps) => {
    const [items, setItems] = useState<GridItem[]>([]);

    useEffect(() => {
        const allItems: GridItem[] = [
            { type: 'photo', data: image1 },
            { type: 'photo', data: image2 },
            { type: 'photo', data: image3 },
            { type: 'photo', data: image4 },
            { type: 'photo', data: image5 },
            { type: 'photo', data: image6 },
            { type: 'photo', data: image7 },
            { type: 'photo', data: image8 },
            { type: 'album', data: { id: 1, title: "Zdjęcia ślubne Agaty i Łukasza" } },
            { type: 'album', data: { id: 2, title: "Wakacje 2023" } },
            { type: 'album', data: { id: 3, title: "Portrety" } },
        ];

        // Mapowanie wartości `view` na odpowiadające wartości `item.type`
        const typeMap = {
            photos: 'photo',
            albums: 'album',
            authors: 'author',
        };

        const filteredItems = allItems.filter(item => item.type === typeMap[view]);
        const combinedItems = [
            ...filteredItems,
            ...(view === 'authors' ? authors.map(author => ({
                type: 'author' as const,
                data: author,
            })) : []),
        ];

        setItems(combinedItems);
    }, [view, authors]);

    return (
        <section className="grid-container-dynamic">
            {items.map((item, index) => (
                <div key={index} className="grid-container-dynamic__grid-item-dynamic">
                    {item.type === 'photo' && (
                        <img src={item.data} alt={`Dynamic Grid item ${index}`} loading="lazy" className="grid-container-dynamic__grid-item-dynamic--img"/>
                    )}
                    {item.type === 'album' && (
                        <AlbumElement />
                    )}
                    {item.type === 'author' && (
                        <AuthorTile authorId={item.data.id} name={`${item.data.first_name} ${item.data.last_name}`} />
                    )}
                </div>
            ))}
        </section>
    );
};

export default DynamicGrid;