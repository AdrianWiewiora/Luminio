import "./community.scss";
import CtaButton from "../../../../components/btn/CTA/ctaButton";
import {
    Community1,
    Community2,
    Community3,
    Community4,
    Community5,
    Community6,
    Community7,
    Community8,
    Community9,
    Community10,
    Community11,
    Community12,
    Community13,
    Community14,
    Community15,
    Community16,
    Community17,
    Community18
} from "../../../../assets/img/imgExport";


const scrollItems = [
    { id: 1, name: Community1 },
    { id: 2, name: Community2 },
    { id: 3, name: Community3 },
    { id: 4, name: Community4 },
    { id: 5, name: Community5 },
    { id: 6, name: Community6 },
    { id: 7, name: Community7 },
    { id: 8, name: Community8 },
    { id: 9, name: Community9 },
    { id: 10, name: Community10 },
    { id: 11, name: Community11 },
    { id: 12, name: Community12 },
    { id: 13, name: Community13 },
    { id: 14, name: Community14 },
    { id: 15, name: Community15 },
    { id: 16, name: Community16 },
    { id: 17, name: Community17 },
    { id: 18, name: Community18 }
];


function Community(){
    return(
        <section className="community-container">
            <div className="community-container__content">
                <h2 className="community-container__content--h2">
                    Zostań częścią <br/>
                    naszej kreatywnej <br/>
                    społeczności
                </h2>
                <CtaButton />
            </div>
            <div className="community-container__img-scroll">
                {scrollItems.map(({ id, name }) => (
                    <img key={id} src={name} alt={`Community image ${id}`} className="scroll-item" />
                ))}
            </div>
        </section>
    );
}

export default Community;