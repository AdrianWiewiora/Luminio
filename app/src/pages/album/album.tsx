import './album.scss';

import Header from '../../components/header/header';
import Banner from '../../components/banner/banner';
import Reviews from '../../components/reviews/reviews'
import Title from './sections/title/title'
import AsideManager from './sections/asideManager/asideManager';
import Footer from '../../components/footers/main/footer';

function Album() {
    return (
      <main className="album">
        <Header />
        <Banner />
        <div className="album__wrapper">
          <div className="album__wrapper--content">
            <Title />
            <Reviews /> 
            <Reviews /> 
            <Reviews /> 
            <Reviews /> 
          </div>
          <AsideManager />
        </div>
        
        <Footer />
      </main>
    );
  }
    
  export default Album;