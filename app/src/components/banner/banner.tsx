import "./banner.scss";
import BannerImg from "../../assets/img/banner.png";
import { MdEdit } from "react-icons/md";


function Banner() {
  return (
    <div className="wrapper">
      <img src={BannerImg} alt="banner" className="wrapper__banner" />
      <div className="wrapper__overlay">
        <div className="wrapper__overlay--btn">
          <MdEdit className="wrapper__overlay--btn--icon" />
          <span className="wrapper__overlay--btn--span">
            Edytuj baner
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
