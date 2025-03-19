import './photoParalax.scss';
import { paralax1, paralax2, paralax3, paralax4, paralax5, paralax6, paralax7, paralax8, paralax9, paralax10, paralax11, paralax12 } from '../../../../assets/img/imgExport.tsx';

const paralaxImages = [
  { id: 0, name: paralax1 },
  { id: 1, name: paralax2 },
  { id: 2, name: paralax3 },
  { id: 3, name: paralax4 },
  { id: 4, name: paralax5 },
  { id: 5, name: paralax6 },
  { id: 6, name: paralax7 },
  { id: 7, name: paralax8 },
  { id: 8, name: paralax9 },
  { id: 9, name: paralax10 },
  { id: 10, name: paralax11 },
  { id: 11, name: paralax12 },
]

function PhotoParalax() {
  return (
    <section className="paralax-container">
      {paralaxImages.map(({id, name}) => (
          <img src={name} key={id} className="paralax-container__picture"/>
      ))}
    </section>
  );
}

export default PhotoParalax;
