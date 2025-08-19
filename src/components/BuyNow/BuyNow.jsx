import React from 'react';
import './buynow.css';
function BuyNow({onaddCart,onbuyNow}) {
  return (
    <div>
        <div className="prodd">
            <button onClick={onaddCart} className='atc qto-bold'>Add to cart</button>
            <button className='byn qto-bold'>Buy Now</button>
        </div>
    </div>
  )
}

export default BuyNow