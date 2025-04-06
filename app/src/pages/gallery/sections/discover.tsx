import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; 
import "./discover.scss";
import { CiCamera, CiFolderOn } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { PiSlidersBold } from "react-icons/pi";
import FilterBtn from "../../../components/btn/filter/filter.tsx";

const filtrList = [
    { id: 0, icon: CiCamera, name: "Zdjęcia" },
    { id: 1, icon: CiFolderOn, name: "Albumy" },
    { id: 2, icon: FaRegUser, name: "Twórcy" },
];

interface DiscoverProps {
    onViewChange: (view: 'photos' | 'albums' | 'authors') => void;
}

function Discover({ onViewChange }: DiscoverProps) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); 
    const view = searchParams.get("view") || "photos"; 
    const [selectedOption, setSelectedOption] = useState<string>(view === "photos" ? "Zdjęcia" : view === "albums" ? "Albumy" : "Twórcy");

    useEffect(() => {
        if (view === "photos") {
            setSelectedOption("Zdjęcia");
            onViewChange('photos');
        } else if (view === "albums") {
            setSelectedOption("Albumy");
            onViewChange('albums');
        } else if (view === "authors") {
            setSelectedOption("Twórcy");
            onViewChange('authors');
        }
    }, [view, onViewChange]);

    const handleOptionClick = (name: string) => {
        setSelectedOption(name); 

        if (name === "Zdjęcia") {
            navigate("/gallery?view=photos");
        } else if (name === "Albumy") {
            navigate("/gallery?view=albums");
        } else if (name === "Twórcy") {
            navigate("/gallery?view=authors");
        }
    };

    return (
        <section className="discover">
            <div className="discover__head">
                <h1 className="discover__head--h1">
                    Odkryj wyjątkowe <br /> treści
                </h1>
                <span className="discover__head--text">
                    Przeglądaj tysiące zdjęć od utalentowanych fotografów z całego świata.
                    Filtruj według kategorii, stylu i tematyki, aby znaleźć idealne ujęcie dla siebie.
                </span>
            </div>
            <div className="discover__filter">
                <div className="discover__filter--options">
                    {filtrList.map(({ id, icon: Icon, name }) => (
                        <span 
                            key={id} 
                            className={`discover__filter--options--single-option ${selectedOption === name ? "active" : ""}`}
                            onClick={() => handleOptionClick(name)}
                        >
                            <Icon className="discover__filter--options--single-option--icon" />
                            {name}
                        </span>
                    ))}
                </div>
                <div className="discover__filter--options--single-option">
                    <FilterBtn title="Sortuj..." />
                    <PiSlidersBold className="discover__filter--options--single-option--filter"/>
                </div>
            </div>
        </section>
    );
}

export default Discover;