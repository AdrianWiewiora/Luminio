import './album.scss';

import Header from '../../components/header/header.tsx';
import Banner from '../../components/banner/banner.tsx';
import Reviews from '../../components/reviews/reviews.tsx'
import Title from './sections/title/title.tsx'
import DynamicGrid from "../../components/ImgGrid/dynamicGrid/dynamicGrid.tsx";
import AsideManager from './sections/asideManager/asideManager.tsx';
import Footer from '../../components/footers/main/footer.tsx';

function Album() {
    return (
      <main>
        <Header />
        <Banner />
        <div className="album-wrapper">
          <div className="album-wrapper__content">
            <Title />
            <DynamicGrid />
            <Reviews /> 
          </div>
          <AsideManager />
        </div>
        <Footer />
      </main>
    );
  }
    
  export default Album;