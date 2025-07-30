import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom'
// import { products } from '../../Data/Product';
import '../../css/Slide.css'

const PrevArrow = ({ onClick }) => {
    return (
        <div className="slider-arrow slider-prev-arrow" onClick={onClick}>
            &lt;
        </div>
    );
};

const NextArrow = ({ onClick }) => {
    return (
        <div className="slider-arrow slider-next-arrow" onClick={onClick}>
            &gt;
        </div>
    );
};


const Slide = ({ Title, products }) => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 2000,
        initialSlide: 0,
        draggable: false,
        swipeToSlide: true,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToScroll: 1,
                    initialSlide: 2,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 2
                }
            }
        ]
    };

    return (
        <div className="product-section">
            <div className="products-deal">
                <h3>{Title}</h3>
                <button className='view-btn'>View All</button>
            </div>
            <Divider />
            <Slider
                {...settings}>
                {products.products?.map((e) => {
                    return (
                        <Link to={`/getproducts/${e?.id}`}>
                            <div className="products-items">
                                <div className="product-img">
                                    <img src={e?.url} alt="productitem" />
                                </div>
                                <p className='products-name'>{e?.title?.shortTitle}</p>
                                <p className='products-offer'>{e?.discount}</p>
                                <p className='products-explore'>{e?.tagline}</p>
                            </div>
                        </Link>
                    )
                })}
            </Slider>
        </div>
    )
}

export default Slide