import React, { useEffect } from 'react'
import Banner from './Banner'
import '../../css/Home.css'
import Slide from './Slide'
import adBanner from '../../assets/add-banner.jpg'
import { getProducts } from '../Redux/actions/action'
import { useDispatch, useSelector } from 'react-redux'


const MainComponent = () => {

  const { products } = useSelector(state => state.getproductsData)
  console.log(products);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <div className="home-section">
      <div className="banner-part">
        <Banner />
      </div>
      <div id="slider-section">
        <div className="left-slide">
          <Slide Title="Deal of the day" products={products} />
        </div>
        <div className="right-slide">
          <h4>Festive latest launches</h4>
          <img src="https://m.media-amazon.com/images/I/71xHyqBwdcL._SX3000_.jpg" alt="no load" />
          <div className="right-slide-link">
            <a href="#">See more</a>
          </div>
        </div>
      </div>
      <Slide Title="Today's deal" products={products} />
      <div className="center-img">
        <img src={adBanner} alt="add banner not load" />
      </div>
      <Slide Title="Best Seller" products={products} />
      <Slide Title="Upto 80% off" products={products} />
    </div>
  )
}

export default MainComponent