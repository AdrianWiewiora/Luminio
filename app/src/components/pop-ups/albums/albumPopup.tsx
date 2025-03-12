import "./albumPopup.scss";
import { FaRegCircleXmark } from "react-icons/fa6";

interface AlbumPopupProps {
    onClose: () => void;
}

function AlbumPopup({ onClose }: AlbumPopupProps) {
    return (
        <section className="popup-overlay" onClick={onClose}>
            <div className="popup-overlay__content" onClick={(e) => e.stopPropagation()}>
                <button className="popup-overlay__content--button" onClick={onClose}>
                    <FaRegCircleXmark className="popup-overlay__content--button--icon"/>
                </button>
                
            </div>
        </section>
    );
}

export default AlbumPopup;
