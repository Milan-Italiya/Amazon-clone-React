import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import '../../css/Cart.css';
import { BACKEND_URI } from '../utils/utils.js';
import { LoginContext } from '../Context/LoginContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Cart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setAccount } = useContext(LoginContext);
  const [productsDetails, setProductsDetails] = useState("");

  useEffect(() => {
    const productDetails = async () => {
      try {
        const res = await fetch(`${BACKEND_URI}/getproducts/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (res.status === 201) {
          setProductsDetails(data.productDetails);
        } else {
          console.log('No product data found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    window.scrollTo(0, 0);
    setTimeout(() => {
      productDetails();
    }, 3000);
  }, [id]);

  const addToCart = async (product_id) => {
    try {
      const res = await fetch(`${BACKEND_URI}/addcart/${product_id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Product_Details: productsDetails }),
      });

      const data = await res.json();
      if (res.status === 401 || !data) {
        alert('User Invalid');
      } else {
        setAccount(data);
        navigate('/buy');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  return (
    <div className="cart-section">
      {
        productsDetails &&
        <>
          <div className="cart-container">
            <div className="left-cart">
              <img src={productsDetails.detailUrl} alt="Product" />
              <div className="cart-btn">
                <button className="cart-btn1" onClick={() => addToCart(productsDetails.id)}>
                  Add to Cart
                </button>
                <button className="cart-btn2">Buy Now</button>
              </div>
            </div>

            <div className="right-cart">
              <h3>{productsDetails.title?.shortTitle}</h3>
              <h4>{productsDetails.title?.longTitle}</h4>
              <Divider />
              <p className="mrp">M.R.P.: ₹ {productsDetails.price?.mrp}</p>
              <p>
                Deal Of the Day : <span>₹ {productsDetails.price?.cost}</span>
              </p>
              <p>
                You save : ₹ {productsDetails.price?.mrp - productsDetails.price?.cost} (
                {productsDetails.price?.discount})
              </p>

              <div className="discount-box">
                <h5>
                  Discount : <span className="discount-value">{productsDetails.discount}</span>
                </h5>
                <h4>
                  Free Delivery <span className="free-delivery-value">Oct 8-21</span> Details
                </h4>
                <p>
                  Fastest Delivery <span className="fast-delivery-value">Tomorrow 11AM</span>
                </p>
              </div>

              <p className="description">
                About the Item: <span>{productsDetails.description}</span>
              </p>
            </div>
          </div>
        </>
      }

      {!productsDetails ? <div className="circle">
        <CircularProgress />
        <h2>Loading...</h2>
      </div> : ''}

    </div>
  );
};

export default Cart;
