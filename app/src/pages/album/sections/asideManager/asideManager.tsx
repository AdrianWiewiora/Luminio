import './asideManager.scss';

import Submit from '../../../../components/btn/submit/submit';

function AsideManager () {

    return (
        <aside className="container">
            <div className="container__upload">
                <h2 className="container__upload--h2">
                    Dodaj zawartość
                </h2>

            </div>
            <div className="container__edit">
            <h2 className="container__edit--h2">
                    Edytuj
                </h2>
            </div>
            <div className="container__btn">
                <Submit title={"Zapisz projekt"} />
            </div>

        </aside>
    );
}

export default AsideManager