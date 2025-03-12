import "./submit.scss";

type SubmitProps = {
    title: string;
};

function Submit({title}: SubmitProps){
    return(
        <button className="submit-btn">
            <span className="submit-btn__text">
                {title}
            </span>
        </button>
    );
}

export default Submit;