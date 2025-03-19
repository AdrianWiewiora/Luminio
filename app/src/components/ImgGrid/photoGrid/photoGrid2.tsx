import React, { useState, useRef, useEffect } from "react";
import Masonry from "https://esm.sh/react-masonry-css@1.0.16";
import { image1, image2, image3, image4, image5, image6, image7, image8 } from "../../../assets/img/imgExport.tsx";
import "./photoGrid2.scss";

const allImages = [
  image4, image2, image3, image1, image5, image6, image7, image8,
  image5, image6, image7, image8, image4, image2, image3, image1,
  image1, image3, image5, image7, image2, image4, image6, image8,
  image6, image8, image4, image2, image7, image5, image3, image1,
  image3, image1, image7, image5, image8, image6, image2, image4,
  image4, image2, image3, image1, image5, image6, image7, image8,
];

const COLUMN_COUNT = 4;

const GalleryGrid = () => {
  const imgRefs = useRef({});

  const breakpointColumnsObj = {
    default: COLUMN_COUNT,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {allImages.map((src, imgIndex) => (
        <img
          key={imgIndex}
          ref={(el) => { if (el) imgRefs.current[imgIndex] = el; }}
          src={src}
          alt={`img-${imgIndex}`}
        />
      ))}
    </Masonry>
  );
};

export default GalleryGrid;