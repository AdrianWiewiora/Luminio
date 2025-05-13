import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./mainGrid.scss";

interface Photo {
  id: number;
  file_path: string;
  album_id: number;
}

function MainGrid() {
  const [allImages, setAllImages] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/photos?amount=${12}&page=${1}`);
        if (response.ok) {
          const photos = await response.json();
          setAllImages(photos);
        } else {
          console.error("Błąd odpowiedzi:", response.status);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania obrazów:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const gridContainer = document.querySelector(".grid");
      if (!gridContainer) return;

      const gridItems = document.querySelectorAll(".grid__item");
      const containerRect = gridContainer.getBoundingClientRect();
      const scrollY = window.scrollY;

      if (containerRect.top < window.innerHeight && containerRect.bottom > 0) {
        const smoothScroll = (scrollY - lastScrollY) * 0.1;
        lastScrollY += smoothScroll;

        gridItems.forEach((item, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const rowSpeed = 5;
          const colSpeed = col % 2 === 0 ? 6 : 3;

          let yPos = -((lastScrollY - gridContainer.offsetTop) / rowSpeed) + row * 5;
          let yOffset = (scrollY - gridContainer.offsetTop) / colSpeed;

          const itemRect = item.getBoundingClientRect();
          if (itemRect.top < containerRect.top) {
            yPos = 0;
            yOffset = 0;
          }

          let opacity = 1;
          if (containerRect.bottom <= window.innerHeight) {
            let fadeStart = window.innerHeight - containerRect.bottom;
            opacity = Math.max(0, 1 - fadeStart / 200);
          }

          item.style.transform = `translateY(${yPos + yOffset}px)`;
          item.style.opacity = opacity.toString();
          item.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allImages]);

  if (loading) {
    return <div className="loading">Ładowanie zdjęć...</div>;
  }
  if (allImages.length === 0) {
    return <div className="loading">Brak zdjęć na naszej stronie.</div>;
  }
  return (
    <section className="grid">
      {allImages.map((photo) => (
        <div key={photo.id} className="grid__item">
          <Link to={`/album/${photo.album_id}`}>
            <img
              src={`/api/files/${photo.id}`}
              alt={`Zdjęcie ${photo.id}`}
              className="grid__img"
            />
          </Link>
        </div>
      ))}
    </section>
  );
}

export default MainGrid;