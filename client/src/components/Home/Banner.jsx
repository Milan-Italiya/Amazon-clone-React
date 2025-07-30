import React from "react";
import "../../css/Banner.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = ({ onClick }) => {
  return (
    <div className="banner-arrow banner-prev-arrow" onClick={onClick}>
      &lt;
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <div className="banner-arrow banner-next-arrow" onClick={onClick}>
      &gt;
    </div>
  );
};


const Banner = () => {
  const data = [
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/e8a78ecc184f5eb7.jpg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/5b309e98775e22e4.jpg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/e26a921db8ae588e.jpeg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/f5b9c098bb81f182.jpeg?q=60",
    "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/59cc03576ab30951.jpg?q=60",
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="banner-container">
      <Slider {...settings}>
        {data.map((img, index) => (
          <div key={index} className="banner-slide">
            <img src={img} alt={`slide-${index}`} className="banner-img" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
