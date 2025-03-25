import "./searchGrid.scss";
import FilterBtn from "../../btn/filter/filter.tsx";

const filterOptions = [
    { id: 0, name: "Ślubne" },
    { id: 1, name: "Krajobrazy" },
    { id: 2, name: "Portrety" },
    { id: 3, name: "Architektura" }
];




function SearchGrid() {
    return(
        <section className="search-grid">
            <h2 className="search-grid__h2">
                Ostatnie zdjęcia
            </h2>
            <div className="search-grid__filter-content">
                {filterOptions.map(({id, name}) => (
                    <FilterBtn key={id} title={name} />
                ))}
            </div>
            
        </section>
    );
}

export default SearchGrid;