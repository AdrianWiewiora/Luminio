import './album.scss';

import Header from '../../components/header/header';
import Banner from '../../components/banner/banner';
import Reviews from './sections/reviews/reviews'

function Album() {
    return (
      <div>
        <Header />
        <Banner />
        <div className="content">
          
        </div>
        <Reviews />
      </div>
    );
  }
    
  export default Album;