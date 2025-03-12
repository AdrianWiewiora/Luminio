import './review.scss';
import profile from '../../assets/img/community/community9.png';
import StarRating from './starRating/starRating';

function Review() {
    return (
        <div className="review">
            <div className="review__head">
                <div className="review__head--user">
                    <img src={profile} alt="profile" className="review__head--user--profile" />
                    <span className="review__head--user--name"> Jan Nowak </span>
                </div>
                <div className="review__head--info">
                    <StarRating rating={3} readOnly={true} />
                    <span className="review__head--info--date"> 05.03.2025</span>
                </div>
            </div>
            <div className="review__content">
                Ta fotografia emanuje niesamowitą atmosferą. Ujęcie jest przemyślane, a gra świateł i cieni tworzy hipnotyzujący efekt. Kolory są nasycone, ale nieprzesadzone, co dodaje zdjęciu głębi. Kompozycja jest dynamiczna, a uchwycony moment wydaje się być zatrzymany w czasie. Widać, że fotograf ma wyczucie detalu i potrafi dostrzec piękno w codzienności.
            </div>
        </div>
    );
}

export default Review;
