import React, { useEffect, useState } from 'react';
import '../../css/Buy.css';

const Subtotal = ({ items = [] }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const totalAmount = items.reduce((total, item) => total + (item?.price?.cost || 0), 0);
    setPrice(totalAmount);
  }, [items]);

  return (
    <div className="sub-item">
      <h3>
        SubTotal ({items.length} item{items.length !== 1 && 's'}): <strong>$ {price.toFixed(2)}</strong>
      </h3>
    </div>
  );
};

export default Subtotal;
