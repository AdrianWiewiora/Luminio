import './main.scss';

import Header from '../../components/header/header';
import Hero from './sections/hero/hero';
import PhotoParalax from './sections/photoParalax/photoParalax';
import Info from './sections/info/info';
import Community from './sections/community/community';
import SearchGrid from '../../components/ImgGrid/searchGrid/searchGrid';

function Main() {
    return (
      <div>
        <Header />
        <Hero />
        <PhotoParalax />
        <Info />
        <Community />
        <SearchGrid />
      </div>
    );
  }
  
  export default Main;