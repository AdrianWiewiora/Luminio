import "./banner.scss";
import BannerImg from "../../assets/img/banner.png";

function Banner() {
  return (
    <div className="banner-container">
      <img src={BannerImg} alt="banner" className="banner-container__banner" />
    </div>
  );
};

export default Banner;
