import './main.scss';

import Header from '../../components/header/header';
import Hero from './sections/hero/hero';
import PhotoParalax from './sections/photoParalax/photoParalax';
import Info from './sections/info/info';
import Community from './sections/community/community';
import SearchGrid from '../../components/ImgGrid/searchGrid/searchGrid';
import MainGrid from '../../components/ImgGrid/mainGrid/mainGrid';
import DynamicGrid from "../../components/ImgGrid/dynamicGrid/dynamicGrid.tsx";


function Main() {
    return (
      <div>
        <Header />
        <Hero />
        <PhotoParalax />
        <Community />
        <SearchGrid />
        <MainGrid />

        <Info />
        <DynamicGrid/>
      </div>
    );
  }
  
  export default Main;