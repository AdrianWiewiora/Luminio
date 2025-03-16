import './singleReview.scss';
import profile from '../../../assets/img/community/community9.png';
import StarRating from '../starRating/starRating';

function singleReview() {
    return (
        <div className="review">
            <div className="review__head">
                <div className="review__head--user">
                    <img src={profile} alt="profile" className="review__head--user--profile" />
                    <h1 className="review__head--user--h1">
                        Jan Nowak
                    </h1>
                </div>
                <div className="review__head--info">
                    <StarRating rating={3} readOnly={true} />
                    <h2 className="review__head--info--date">
                        05.03.2025
                    </h2>
                </div>
            </div>
            <p className="review__content">
                Ta fotografia emanuje niesamowitą atmosferą. Ujęcie jest przemyślane, a gra świateł i cieni tworzy hipnotyzujący efekt. Kolory są nasycone, ale nieprzesadzone, co dodaje zdjęciu głębi. Kompozycja jest dynamiczna, a uchwycony moment wydaje się być zatrzymany w czasie. Widać, że fotograf ma wyczucie detalu i potrafi dostrzec piękno w codzienności.
            </p>
        </div>
    );
}

export default singleReview;
