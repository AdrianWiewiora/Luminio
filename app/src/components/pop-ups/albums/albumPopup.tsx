import "./albumPopup.scss";
import FormInput from "../../inputs/formInput/formInput.tsx";
import Submit from "../../btn/submit/submit.tsx";
import TextArea from "../../inputs/textarea/textArea.tsx";
import Checkbox from "../../inputs/checkbox/checkbox.tsx";
import { FaRegCircleXmark } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { paralax10 } from "../../../assets/img/imgExport.tsx";

interface AlbumPopupProps {
    onClose: () => void;
}

const CheckboxOptions = [
    { id: "Wesele", title: "Wesele" },
    { id: "Artystyczne", title: "Artystyczne"},
    { id: "Sesja zdjęciowa", title: "Sesja zdjęciowa"},
    { id: "Rodzinne", title: "Rodzinne"},
];

function AlbumPopup({ onClose }: AlbumPopupProps) {
    return (
        <section className="album-popup" onClick={onClose}>
            <div className="album-popup__content" onClick={(e) => e.stopPropagation()}>
                <button className="album-popup__content--button" onClick={onClose}>
                    <FaRegCircleXmark className="album-popup__content--button--icon"/>
                </button>
                <div className="album-popup__content--img-section">
                    <h2 className="album-popup__content--img-section--title">
                        Okładka projektu
                    </h2>
                    <img src={paralax10} alt="album image" className="album-popup__content--img-section--img"/>
                    <span className="album-popup__content--img-section--change">
                        <GoPencil /> Zmień
                    </span>
                </div>
                <form className="album-popup__content--form">
                    <FormInput key="Tytuł projektu" id="0" label="Tytuł projektu" type="text" />
                    <TextArea label="Opis" />
                    {CheckboxOptions.map(({ id, title}) => (
                        <Checkbox key={id} title={title} />
                    ))}
                    <div className="album-popup__content--form--options">
                        <p> 
                            Anuluj
                        </p>
                        <Submit title="Zaktualizuj profil" />
                    </div>
                </form>
            </div>
        </section>
    );
}

export default AlbumPopup;
