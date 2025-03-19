import './hero.scss';
import CtaButton from '../../../../components/btn/CTA/ctaButton.tsx';

function Hero(){
    return(
        <section className="hero-section">
            <div className="hero-section__content">
                <h2 className="hero-section__content--h2">
                    Twoje zdjęcia <br/> pasja i społeczność
                </h2>
                <span className="hero-section__content--text">
                    Buduj swoją markę, pokazując unikalne ujęcia i wyróżniając się na 
                    tle konkurencji. Przyciągaj klientów, którzy szukają fotografów 
                    o wyjątkowym spojrzeniu i profesjonalnym podejściu.
                </span>
            </div>
            <div className="hero-section__button">
                <CtaButton />
            </div>
        </section>
    );
}

export default Hero;