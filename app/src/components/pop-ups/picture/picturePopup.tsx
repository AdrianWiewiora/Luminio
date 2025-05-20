import "./picturePopup.scss";
import { FaRegCircleXmark } from "react-icons/fa6";
import SingleReview from "../../reviews/singleReview/singleReview.tsx";

interface PicturePopupProps {
    onClose: () => void;
    photo: {
        blobUrl: string;
        title?: string;
        description?: string;
    };
}

function PicturePopup({ onClose, photo }: PicturePopupProps) {
    return (
        <section className="picture-popup" onClick={onClose}>
            <div className="picture-popup__content" onClick={(e) => e.stopPropagation()}>
                <button className="picture-popup__content--button" onClick={onClose}>
                    <FaRegCircleXmark className="picture-popup__content--button--icon"/>
                </button>
                <div className="picture-popup__content--gallery-item">
                    <img 
                      src={photo.blobUrl} 
                      alt="image" 
                      className="picture-popup__content--gallery-item--img"
                    />
                </div>
            </div>
        </section>
    );
}

export default PicturePopup;