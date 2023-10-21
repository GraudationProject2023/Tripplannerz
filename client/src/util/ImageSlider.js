import Slider from "react-slick";
import main1 from '../Image/main.jpg'
import main2 from '../Image/main2.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    infinite: true,
    slickarrow: true,
    speed: 500,
    slideToShow: 1,
    slideToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    dots: false,
};


export function ImageSlider() {
    
    return (
      <div className="image-slider">
        <Slider {...settings}>
          <div>
            <img alt="img1" className="main-slider-img" src={main1} />
          </div>
          <div>
            <img alt="img2" className="main-slider-img" src={main2} />
          </div>
        </Slider>
      </div>
    );
}