import { useState } from "react";
import "./info.scss";
import Logo from "../../../../assets/img/logo.png";
import { Info1, Info2, Info3 } from '../../../../assets/img/imgExport';

const contentData: Record<number, { headline: string; text: string; imgSrc: string; alt: string }> = {
    0: {
        headline: "Twórz, Inspiruj. Zarabiaj.",
        text: `Dodawaj swoje najlepsze zdjęcia i organizuj je w profesjonalne katalogi, 
        które w pełni oddadzą Twój styl i umiejętności. Twórz unikalne kolekcje, 
        buduj swoją markę i przyciągaj klientów, którzy szukają wyjątkowych fotografii. 
        Niezależnie od tego, czy jesteś doświadczonym fotografem, czy dopiero zaczynasz swoją przygodę, 
        masz pełną kontrolę nad swoim portfolio, ofertą i sposobem prezentacji swojej pracy. 
        Rozwijaj swoją pasję i przekształcaj ją w realne możliwości zawodowe.`,
        imgSrc: Info1,
        alt: "Camera lens"
    },
    1: {
        headline: "Znajdź idealnego fotografa.",
        text: `Szukasz fotografa, który uchwyci najważniejsze chwile w Twoim życiu? 
        Przeglądaj portfolio najlepszych twórców, porównuj ich styl i znajdź idealnego specjalistę 
        do sesji ślubnej, eventowej czy portretowej. 
        Rezerwuj usługi bezpośrednio na platformie i miej pewność, że Twoje wspomnienia zostaną uwiecznione w najlepszy możliwy sposób.`,
        imgSrc: Info2,
        alt: "Photography studio"
    },
    2: {
        headline: "Odkrywaj. Wybieraj. Rezerwuj.",
        text: `Fotografia to Twoje hobby? Odkrywaj prace utalentowanych twórców, poznawaj nowe techniki 
        i czerp inspiracje z unikalnych kolekcji zdjęć. 
        Dołącz do społeczności, dziel się swoimi spostrzeżeniami i rozwijaj swoją pasję, 
        nawiązując kontakt z profesjonalistami i innymi miłośnikami fotografii.`,
        imgSrc: Info3,
        alt: "Laptop screen"
    }
};

const navItems = [
    { id: 0, name: "Dla fotografów" },
    { id: 1, name: "Dla klientów" },
    { id: 2, name: "Dla pasjonatów" }
];

function Info() {
    const [activeTab, setActiveTab] = useState(1);

    return (
        <section className="info-container">
            <header className="info-container__header">
                <img src={Logo} alt="logo" className="info-container__header--logo"/>
                <h2 className="info-container__header--h2">
                    dla każdego
                </h2>
            </header>
            <nav className="info-container__nav">
                <ul className="info-container__nav--ul">
                    {navItems.map(({ id, name }) => (
                        <li key={id} 
                            className={`info-container__nav--ul--li ${activeTab === id ? "active" : ""}`}
                            onClick={() => setActiveTab(id)} 
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            </nav>
            <section className="info-container__content">
                <div className="info-container__content--description">
                    <div className="info-container__content--description--head">
                        <h5 className="info-container__content--description--head--title">
                            Dla fotografów
                        </h5>
                        <h2 className="info-container__content--description--head--headline">
                            {contentData[activeTab].headline}
                        </h2>
                    </div>
                    <span className="info-container__content--description--text">
                        {contentData[activeTab].text}
                    </span>
                </div>
                <div className="info-container__content--img-section">
                    <img src={contentData[activeTab].imgSrc} alt={contentData[activeTab].alt}  className="info-container__content--img-section--img"/>
                </div>
            </section>
        </section>
    );
}

export default Info;
