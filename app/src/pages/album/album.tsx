import './album.scss';

import Header from '../../components/header/header';
import Banner from '../../components/banner/banner';
import Reviews from './sections/reviews/reviews'
import Title from './sections/title/title'
import AsideManager from './sections/asideManager/asideManager';

function Album() {
    return (
      <main className="album">
        <Header />
        <Banner />
        <div className="album__wrapper">
          <div className="album__wrapper--content">
            <Title />
            <Reviews /> 
          </div>
          <AsideManager />
        </div>
      </main>
    );
  }
    
  export default Album;