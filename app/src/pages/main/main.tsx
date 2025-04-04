import './main.scss';
import Header from '../../components/header/header.tsx';
import Hero from './sections/hero/hero.tsx';
import PhotoParalax from './sections/photoParalax/photoParalax.tsx';
import Info from './sections/info/info.tsx';
import Community from './sections/community/community.tsx';
import SearchGrid from '../../components/ImgGrid/searchGrid/searchGrid.tsx';
import MainGrid from '../../components/ImgGrid/mainGrid/mainGrid.tsx';
import Footer from "../../components/footers/main/footer.tsx";


function Main() {
    return (
      <div>
        {/* <Header /> */}
        <Hero />
        <PhotoParalax />
        <Info />
        <Community />
        <SearchGrid />
        <MainGrid />
        {/* <Footer /> */}
      </div>
    );
  }
  
  export default Main;