import "./picturePopup.scss";
import test from "../../../assets/img/test.png";
import { FaRegCircleXmark } from "react-icons/fa6";
import Review from "../../review/review";

interface PicturePopupProps {
    onClose: () => void;
}

function PicturePopup({ onClose }: PicturePopupProps) {
    return (
        <section className="picture-popup" onClick={onClose}>
            <div className="picture-popup__content" onClick={(e) => e.stopPropagation()}>
                <button className="picture-popup__content--button" onClick={onClose}>
                    <FaRegCircleXmark className="picture-popup__content--button--icon"/>
                </button>
                <div className="picture-popup__content--gallery-item">
                    <img src={test} alt="image" className="picture-popup__content--gallery-item--img"/>
                    <h1 className="picture-popup__content--gallery-item--head">
                        "Zdjęcie ślubne Agaty i Łukasza"
                    </h1>
                    <span className="picture-popup__content--gallery-item--text">
                        Zdjęcia ślubne Agaty i Łukasza to wyjątkowa kolekcja uchwycająca 
                        najpiękniejsze chwile ich wielkiego dnia.
                    </span>
                </div>
                <div className="picture-popup__content--commentary">
                    <Review />
                    <Review />
                </div>
            </div>
        </section>
    );
}

export default PicturePopup;
