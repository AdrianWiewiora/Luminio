import "./accessImg.scss";
import { useState } from "react";
import { logReg1, logReg2, logReg3, logReg4, logReg5, logReg6, logReg7, logReg8, logReg9 } from "../../assets/img/imgExport.tsx";

type ImageType = {
    id: number;
    src: string;
};

const images: ImageType[] = [
    { id: 0, src: logReg1 },
    { id: 1, src: logReg2 },
    { id: 2, src: logReg3 },
    { id: 3, src: logReg4 },
    { id: 4, src: logReg5 },
    { id: 5, src: logReg6 },
    { id: 6, src: logReg7 },
    { id: 7, src: logReg8 },
    { id: 8, src: logReg9 }
];

const getRandomImage = (): string => {
    const randomId = Math.floor(Math.random() * images.length); 
    const selectedImage = images.find(image => image.id === randomId); 
    return selectedImage ? selectedImage.src : logReg1;
};

function AccessImg() {
    const [randomImage] = useState<string>(getRandomImage()); 

    return (
        <section className="access-background">
            <img src={randomImage} alt="background" className="access-background__img" />
        </section>
    );
}

export default AccessImg;
