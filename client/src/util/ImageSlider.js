import { Carousel } from "antd";
import main1 from '../Image/main.jpg'
import main2 from '../Image/main2.jpg'

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slideToShow: 1,
    slideToScroll: 1,
    autoplay: true,
};


export function ImageSlider() {
    return (
      <Carousel {...settings}>
        <div>
          <img alt="img1" className="main-slider-img" src={main1} />
        </div>
        <div>
          <img alt="img2" className="main-slider-img" src={main2} />
        </div>
      </Carousel>
    );
}
