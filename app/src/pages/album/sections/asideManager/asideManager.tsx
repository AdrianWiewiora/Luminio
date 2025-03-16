import './asideManager.scss';
import { TbPhotoPlus } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

import Submit from '../../../../components/btn/submit/submit';

function AsideManager () {

    return (
        <aside className="container">
            <div className="container__sticky">
                <div className="container__sticky--section">
                    <h2 className="container__sticky--section--h2">
                        Dodaj zawartość
                    </h2>
                    <div className="container__sticky--section--item">
                        <TbPhotoPlus className="container__sticky--section--item--icon" />
                        Obraz
                    </div>
                </div>
                <div className="container__sticky--section">
                    <h2 className="container__sticky--section--h2">
                        Edytuj
                    </h2>
                    <div className="container__sticky--section--item">
                        <IoSettingsOutline className="container__sticky--section--item--icon" />
                        Ustawienia
                    </div>
                </div>
                <div className="container__sticky--btn">
                    <Submit title={"Zapisz projekt"} />
                </div>
            </div>
        </aside>
    );
}

export default AsideManager