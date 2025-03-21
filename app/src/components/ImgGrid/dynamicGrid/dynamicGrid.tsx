import "./dynamicGrid.scss";
import { image1, image2, image3, image4, image5, image6, image7, image8 } from "../../../assets/img/imgExport.tsx";

const allImages = [...Array(3)].flatMap(() => [
  image1, image2, image3, image4, image5, image6, image7, image8
]);

const DynamicGrid = () => {
  return (
    <section className="grid-container-dynamic">
      {allImages.map((img, index) => (
        <div key={index} className="grid-container-dynamic__grid-item-dynamic">
          <img src={img} alt={`Dynamic Grid item ${index}`} loading="lazy" />
        </div>
      ))}
    </section>
  );
};

export default DynamicGrid;