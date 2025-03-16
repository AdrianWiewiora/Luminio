import "./discover.scss";
import { CiCamera, CiFolderOn } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { PiSlidersBold } from "react-icons/pi";

import FilterBtn from "../../../components/btn/filter/filter";

const filtrList = [
    { id: 0, icon: CiCamera, name: "Zdjęcia" },
    { id: 1, icon: CiFolderOn, name: "Albumy" },
    { id: 2, icon: FaRegUser, name: "Twórcy" },
];

function Discover() {
    return (
        <section className="discover">
            <div className="discover__head">
                <h1 className="discover__head--h1">
                    Odkryj wyjątkowe <br /> treści
                </h1>
                <span className="discover__head--text">
                    Przeglądaj tysiące zdjęć od utalentowanych fotografów z całego świata. Filtruj według kategorii,
                    <br />
                    stylu i tematyki, aby znaleźć idealne ujęcie dla siebie.
                </span>
            </div>
            <div className="discover__filter">
                <div className="discover__filter--options">
                    {filtrList.map(({ id, icon: Icon, name }) => (
                        <span key={id} className="discover__filter--options--single-option">
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
