import './filter.scss';

type FilterProps = {
    title: string;
};

function FilterBtn({title}: FilterProps){
    return(
        <button className="filter-btn">
            {title}
        </button>
    );
}

export default FilterBtn;