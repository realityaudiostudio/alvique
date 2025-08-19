import React from 'react'
import Heading from '../../components/Heading/Heading';
import Individual from "../../../public/img/ind.png";
import './cart.css';
import { supabase } from '../../../supabaseClient';
import { useState, useEffect } from 'react';
import { useAuth } from '../../authContext/authContext';
import { useNavigate } from 'react-router';

function Cart() {
  const [cartData, setCartData] = useState([]);
  const { user } = useAuth();
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cartData]);

  async function fetchCart() {
    const userid = user?.id;
    const { data, error } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', userid);
    
    if (error) {
      console.log("Error fetching cart", error);
    } else {
      // Initialize each item with its current quantity
      const cartWithQuantities = data.map(item => ({
        ...item,
        currentQty: item.qty || 1 // Use existing qty or default to 1
      }));
      setCartData(cartWithQuantities);
    }
  }
  function handleBuyNow() {
    // Build a single object containing everything needed for checkout
    const buyingNow = {
      userId: user?.id,
      items: cartData,
      total: totalCost
    };

    // Navigate to checkout page with data
    navigate("/check", { state: { buyingNow } });
  }

  function calculateTotal() {
    const total = cartData.reduce((sum, item) => {
      return sum + (item.pr_price * item.currentQty);
    }, 0);
    setTotalCost(total);
  }

  async function updateQuantityInDB(itemId, newQty) {
    try {
      const { data, error } = await supabase
        .from('cart')
        .update({ qty: newQty })
        .eq('id', itemId)
        .select(); // Add select to get updated data back
      
      if (error) {
        console.log("Error updating quantity:", error);
        // Could add user notification here
        return false;
      } else {
        console.log("Quantity updated successfully:", data);
        return true;
      }
    } catch (error) {
      console.log("Network error updating quantity:", error);
      return false;
    }
  }

  async function handleQtyPlus(index) {
    const item = cartData[index];
    if (item.stock_available <= item.currentQty) {
      console.log("Cannot increase quantity - stock limit reached");
      return; // Don't increase if at stock limit
    }
    
    const newQty = item.currentQty + 1;
    
    // Update in database first
    const dbUpdateSuccess = await updateQuantityInDB(item.id, newQty);
    
    if (dbUpdateSuccess) {
      // Only update local state if database update was successful
      const updatedCart = [...cartData];
      updatedCart[index].currentQty = newQty;
      updatedCart[index].qty = newQty; // Also update the original qty field
      setCartData(updatedCart);
    } else {
      console.log("Failed to update quantity in database");
      // Could show error message to user
    }
  }

  async function handleQtyMinus(index) {
    const item = cartData[index];
    if (item.currentQty <= 1) {
      console.log("Cannot decrease quantity below 1");
      return; // Don't decrease below 1
    }
    
    const newQty = item.currentQty - 1;
    
    // Update in database first
    const dbUpdateSuccess = await updateQuantityInDB(item.id, newQty);
    
    if (dbUpdateSuccess) {
      // Only update local state if database update was successful
      const updatedCart = [...cartData];
      updatedCart[index].currentQty = newQty;
      updatedCart[index].qty = newQty; // Also update the original qty field
      setCartData(updatedCart);
    } else {
      console.log("Failed to update quantity in database");
      // Could show error message to user
    }
  }

  async function removeFromCart(itemId) {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', itemId);
    
    if (error) {
      console.log("Error removing item:", error);
    } else {
      // Remove item from local state
      setCartData(cartData.filter(item => item.id !== itemId));
    }
  }

  return (
    <div>
      <div className="final">
        <p className='qto-regular'>Total Cost : </p>
        <h1 className='qto-bold'>${totalCost.toFixed(2)}</h1>
        <p className='qto-regular'>Coupon Applied</p>
        <button className='byn qto-bold' onClick={handleBuyNow}>Buy Now</button>
      </div>
      
      <Heading headVal="My Cart"></Heading>
      
      <div className="cartmain">
        {cartData.map((cartItem, index) => {
          return (
            <div key={cartItem.id || index}>
              <div className="cartind">
                <img className='whatis' src={Individual} alt='individual' />
                
                <div className="cartblock">
                  <h1 className='qto-bold'>{cartItem.pr_name}</h1>
                  <p className='qto-regular'>${cartItem.pr_price}</p>
                  
                  <div className="qty">
                    <button onClick={() => handleQtyMinus(index)}>
                      <svg
                        width="33"
                        height="30"
                        viewBox="0 0 33 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.25"
                          y="0.25"
                          width="32.5"
                          height="29.5"
                          rx="5.75"
                          fill="#E11D1D"
                          fillOpacity="0.34"
                          stroke="#E41812"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M19.291 13.709C19.3757 13.8783 19.418 14.0671 19.418 14.2754C19.418 14.4772 19.4049 14.6465 19.3789 14.7832C19.3594 14.9199 19.3268 15.0404 19.2812 15.1445C19.1641 15.3919 19.0143 15.5156 18.832 15.5156H12.4746C12.403 15.3203 12.3672 15.1283 12.3672 14.9395C12.3672 14.7441 12.377 14.5781 12.3965 14.4414C12.4225 14.3047 12.4583 14.181 12.5039 14.0703C12.6211 13.8294 12.7578 13.709 12.9141 13.709H19.291Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                    
                    <p>{cartItem.currentQty}</p>
                    
                    <button onClick={() => handleQtyPlus(index)}>
                      <svg
                        width="33"
                        height="30"
                        viewBox="0 0 33 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.25"
                          y="0.25"
                          width="32.5"
                          height="29.5"
                          rx="5.75"
                          fill="#1DE127"
                          fillOpacity="0.27"
                          stroke="#14E81F"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M15.7461 15.5156H12.4746C12.403 15.3203 12.3672 15.1283 12.3672 14.9395C12.3672 14.7441 12.377 14.5781 12.3965 14.4414C12.4225 14.3047 12.4583 14.181 12.5039 14.0703C12.6211 13.8294 12.7578 13.709 12.9141 13.709H15.7461V10.252C15.9154 10.1673 16.1009 10.125 16.3027 10.125C16.5111 10.125 16.6836 10.138 16.8203 10.1641C16.9635 10.1836 17.0905 10.2161 17.2012 10.2617C17.4551 10.3789 17.582 10.5286 17.582 10.7109V13.709H20.8047C20.8893 13.8783 20.9316 14.0671 20.9316 14.2754C20.9316 14.4837 20.9186 14.6562 20.8926 14.793C20.873 14.9232 20.8372 15.0404 20.7852 15.1445C20.6745 15.3919 20.528 15.5156 20.3457 15.5156H17.582V18.9629C17.3867 19.0345 17.1914 19.0703 16.9961 19.0703C16.8008 19.0703 16.6315 19.0605 16.4883 19.041C16.3516 19.015 16.2279 18.9792 16.1172 18.9336C15.8698 18.8229 15.7461 18.6862 15.7461 18.5234V15.5156Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <button onClick={() => removeFromCart(cartItem.id)}>
                  <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 32 32" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      opacity="0.2" 
                      d="M25 7V26C25 26.2652 24.8946 26.5196 24.7071 26.7071C24.5196 26.8946 24.2652 27 24 27H8C7.73478 27 7.48043 26.8946 7.29289 26.7071C7.10536 26.5196 7 26.2652 7 26V7H25Z" 
                      fill="#D53530"
                    />
                    <path 
                      d="M27 6H22V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2H13C12.2044 2 11.4413 2.31607 10.8787 2.87868C10.3161 3.44129 10 4.20435 10 5V6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H6V26C6 26.5304 6.21071 27.0391 6.58579 27.4142C6.96086 27.7893 7.46957 28 8 28H24C24.5304 28 25.0391 27.7893 25.4142 27.4142C25.7893 27.0391 26 26.5304 26 26V8H27C27.2652 8 27.5196 7.89464 27.7071 7.70711C27.8946 7.51957 28 7.26522 28 7C28 6.73478 27.8946 6.48043 27.7071 6.29289C27.5196 6.10536 27.2652 6 27 6ZM12 5C12 4.73478 12.1054 4.48043 12.2929 4.29289C12.4804 4.10536 12.7348 4 13 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V6H12V5ZM24 26H8V8H24V26ZM14 13V21C14 21.2652 13.8946 21.5196 13.7071 21.7071C13.5196 21.8946 13.2652 22 13 22C12.7348 22 12.4804 21.8946 12.2929 21.7071C12.1054 21.5196 12 21.2652 12 21V13C12 12.7348 12.1054 12.4804 12.2929 12.2929C12.4804 12.1054 12.7348 12 13 12C13.2652 12 13.5196 12.1054 13.7071 12.2929C13.8946 12.4804 14 12.7348 14 13ZM20 13V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22C18.7348 22 18.4804 21.8946 18.2929 21.7071C18.1054 21.5196 18 21.2652 18 21V13C18 12.7348 18.1054 12.4804 18.2929 12.2929C18.4804 12.1054 18.7348 12 19 12C19.2652 12 19.5196 12.1054 19.7071 12.2929C19.8946 12.4804 20 12.7348 20 13Z" 
                      fill="#D53530"
                    />
                  </svg>
                </button>
              </div>
              <div className="veravera"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;