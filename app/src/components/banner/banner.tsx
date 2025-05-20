import "./banner.scss";
import BannerImg from "../../assets/img/banner.png";
import { MdEdit } from "react-icons/md";


function Banner() {
  return (
    <div className="wrapper">
      <img src={BannerImg} alt="banner" className="wrapper__banner" />
    </div>
  );
};

export default Banner;
