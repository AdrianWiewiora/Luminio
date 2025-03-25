import React, { useEffect } from "react";
import "./mainGrid.scss";
import { image1, image2, image3, image4, image5, image6, image7, image8 } from "../../../assets/img/imgExport.tsx";

const allImages = [
  image1, image2, image3, image4, image5, image6, image7, image8,
  image1, image2, image3, image4, image5, image6, image7, image8,
  image1, image2, image3, image4, image5, image6, image7, image8,
];

function MainGrid(){
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const gridContainer = document.querySelector(".grid");
      const gridItems = document.querySelectorAll(".grid__item");
      const containerRect = gridContainer.getBoundingClientRect();
      const scrollY = window.scrollY;

      // Checking if the grid is within the viewport
      if (containerRect.top < window.innerHeight && containerRect.bottom > 0) {
        const smoothScroll = (scrollY - lastScrollY) * 0.1;
        lastScrollY += smoothScroll;

        gridItems.forEach((item, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const rowSpeed = 5;   //speed for row
          const colSpeed = col % 2 === 0 ? 6 : 3; //spedd for column

          //Calculating effect for each element(col and row)
          let yPos = -((lastScrollY - gridContainer.offsetTop) / rowSpeed) + row * 5;
          let yOffset = (scrollY - gridContainer.offsetTop) / colSpeed;

          // Limit the effect for main conteiner
          const itemRect = item.getBoundingClientRect();
          if (itemRect.top < containerRect.top) {
            yPos = 0;
            yOffset = 0;
          }

          // Fade-out the grid photos
          let opacity = 1;
          if (containerRect.bottom <= window.innerHeight) {
            let fadeStart = window.innerHeight - containerRect.bottom;
            opacity = Math.max(0, 1 - fadeStart / 200);
          }

          item.style.transform = `translateY(${yPos + yOffset}px)`;
          item.style.opacity = opacity;
          item.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="grid">
      {allImages.map((img, index) => (
        <div key={index} className="grid__item" style={{ backgroundImage: `url(${img})` }}>
        </div>
      ))}
    </section>
  );
};

export default MainGrid;