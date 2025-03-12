import './title.scss';

import StarRating from '../../../../components/review/starRating/starRating';

function Title () {

    return (
        <section className="head">
            <div className="head__details">
                <h1 className="head__details--h1">
                    "Zdjęcia ślubne Agaty i Łukasza"
                </h1>
                <div className="head__details--info">
                    <div className="head__details--info--rating">
                        4.7
                        <StarRating rating={4} readOnly={true}/>
                    </div>
                    15.06.2024
                </div>
            </div>
            Zdjęcia ślubne Agaty i Łukasza to wyjątkowa kolekcja uchwycająca najpiękniejsze chwile ich wielkiego dnia. Album pełen jest emocji, wzruszeń i radości, które towarzyszyły im podczas ceremonii oraz przyjęcia. Każde ujęcie oddaje magiczną atmosferę tej niezwykłej uroczystości, pełnej miłości i rodzinnego ciepła. Ślub odbył się 15 czerwca 2024 roku w malowniczej miejscowości Kazimierz Dolny, w otoczeniu natury i zabytkowej architektury. Te fotografie to nie tylko wspomnienia, ale także zapis niepowtarzalnej historii dwojga ludzi rozpoczynających wspólną drogę życia.
        </section>
    );
}

export default Title;