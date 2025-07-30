import React, { useEffect, useState } from 'react';
import purchaseProtection from "../../assets/purchase protection.jpg";
import '../../css/Buy.css'

const RightBuy = ({ items = [] }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const totalAmount = items.reduce((total, item) => total + (item?.price?.cost || 0), 0);
    setPrice(totalAmount);
  }, [items]);

  return (
    <div className="right-buy">
      <img src={purchaseProtection} alt="Purchase Protection" />
      <div className="cost-right">
        <p>Your order is eligible for free Delivery.</p>
        <br />
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
        <h3>
          SubTotal ({items.length} item{items.length !== 1 && 's'}): <span>$ {price.toFixed(2)}</span>
        </h3>
        <button className="right-buy-button">Proceed to Buy</button>
        <div className="emi">EMI available</div>
      </div>
    </div>
  );
};

export default RightBuy;
