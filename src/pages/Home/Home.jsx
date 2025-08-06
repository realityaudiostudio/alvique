import React from "react";
import "./home.css";
import Manushyan from "../../../public/img/photo.png";
import Coin from "../../../public/img/coin.png";
import Individual from "../../../public/img/ind.png";
import Navigation from "../../components/Navigation/Navigation";
import { supabase } from "../../../supabaseClient";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../authContext/authContext";
import { Link } from "react-router";

function Home() {
   const {getUserName} = useAuth();
   const [products,setProducts] = useState([]);
   useEffect(()=>
  {
    fetchProducts();
    // console.log("Updated products:", products);
  },[]);

   async function fetchProducts()
   {
    const {data : proddat,error : proderr} = await supabase.from('products').select('*');
    if(proderr)
    {
      console.log("No products broughtr",proderr);
    }
    else{
      setProducts(proddat);
      console.log(proddat);
    }
   }
  return (
    <div>
      <Navigation></Navigation>
      <div className="mele">
        <div className="koode">
          <div className="koode2">
            <img src={Manushyan} alt="Man" />
          </div>
          <div className="koode3">
            <p className="qto-regular">Good Morning,</p>
            <h1 className="qto-bold">{getUserName()}</h1>
          </div>
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.25 12V19.5C20.25 19.8978 20.092 20.2794 19.8107 20.5607C19.5294 20.842 19.1478 21 18.75 21H4.5C4.10218 21 3.72064 20.842 3.43934 20.5607C3.15804 20.2794 3 19.8978 3 19.5V5.25C3 4.85218 3.15804 4.47064 3.43934 4.18934C3.72064 3.90804 4.10218 3.75 4.5 3.75H12C12.1989 3.75 12.3897 3.82902 12.5303 3.96967C12.671 4.11032 12.75 4.30109 12.75 4.5C12.75 4.69891 12.671 4.88968 12.5303 5.03033C12.3897 5.17098 12.1989 5.25 12 5.25H4.5V19.5H18.75V12C18.75 11.8011 18.829 11.6103 18.9697 11.4697C19.1103 11.329 19.3011 11.25 19.5 11.25C19.6989 11.25 19.8897 11.329 20.0303 11.4697C20.171 11.6103 20.25 11.8011 20.25 12ZM18.375 2.25C17.7075 2.25 17.055 2.44794 16.5 2.81879C15.9449 3.18964 15.5124 3.71674 15.2569 4.33344C15.0015 4.95014 14.9346 5.62874 15.0648 6.28343C15.1951 6.93812 15.5165 7.53948 15.9885 8.01149C16.4605 8.48349 17.0619 8.80493 17.7166 8.93515C18.3713 9.06538 19.0499 8.99854 19.6666 8.74309C20.2833 8.48765 20.8104 8.05507 21.1812 7.50005C21.5521 6.94503 21.75 6.29251 21.75 5.625C21.75 4.72989 21.3944 3.87145 20.7615 3.23851C20.1285 2.60558 19.2701 2.25 18.375 2.25Z"
            fill="#402207"
          />
        </svg>
      </div>
      <div className="bann">
        <div className="bann1">
          <p className="qto-regular">This is impossible</p>
          <h1 className="qto-bold">Get 40 % off on this Product</h1>
        </div>
        <img src={Coin} alt="Coin"></img>
      </div>
      <div className="homenav">
        <p className="qto-bold">The Discount Trend</p>
        <button>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.4133 10.6633L8.16328 16.9133C7.98716 17.0894 7.74829 17.1883 7.49922 17.1883C7.25014 17.1883 7.01127 17.0894 6.83515 16.9133C6.65903 16.7372 6.56009 16.4983 6.56009 16.2492C6.56009 16.0001 6.65903 15.7613 6.83515 15.5852L12.4219 10L6.83672 4.41328C6.74951 4.32607 6.68033 4.22254 6.63314 4.1086C6.58594 3.99466 6.56165 3.87254 6.56165 3.74922C6.56165 3.62589 6.58594 3.50377 6.63314 3.38983C6.68033 3.27589 6.74951 3.17236 6.83672 3.08515C6.92392 2.99795 7.02745 2.92877 7.14139 2.88158C7.25533 2.83438 7.37745 2.81009 7.50078 2.81009C7.62411 2.81009 7.74623 2.83438 7.86017 2.88158C7.97411 2.92877 8.07763 2.99795 8.16484 3.08515L14.4148 9.33515C14.5021 9.42235 14.5714 9.52593 14.6185 9.63994C14.6657 9.75395 14.6899 9.87615 14.6898 9.99954C14.6897 10.1229 14.6652 10.2451 14.6177 10.359C14.5702 10.4729 14.5008 10.5763 14.4133 10.6633Z"
              fill="#241303"
            />
          </svg>
        </button>
      </div>
      <div className="hnera">
        {products.filter(product =>product.is_trending === true && product.stock_available > 0).map((product,index)=>{
          const sellingPrice = Number(product.pr_act_price) - Number(product.pr_disc);
          return(
            <Link to={`/prodind/${product.id}`} state={{product}} key={product.id} style={{ textDecoration: "none", color: "inherit" }}>
          <div key={index} className="hneraind">
          <div class="card">
            <img src={Individual} alt="Currency Note" class="card-img" />
            <div class="price-tag qto-bold">${sellingPrice}</div>
          </div>
          <h1>{product.pr_name}</h1>
          <p>{product.rating} Rating</p>
        </div>
        </Link>
        )})}
        
        
        {/* <div className="hneraind">
          <div class="card">
            <img src={Individual} alt="Currency Note" class="card-img" />
            <div class="price-tag qto-bold">$30</div>
          </div>
          <h1>The coin bank</h1>
          <p>4.8 Rating</p>
        </div>   */}
      </div>
      <div className="homenav">
        <p className="qto-bold">The Old Trend</p>
        <button>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.4133 10.6633L8.16328 16.9133C7.98716 17.0894 7.74829 17.1883 7.49922 17.1883C7.25014 17.1883 7.01127 17.0894 6.83515 16.9133C6.65903 16.7372 6.56009 16.4983 6.56009 16.2492C6.56009 16.0001 6.65903 15.7613 6.83515 15.5852L12.4219 10L6.83672 4.41328C6.74951 4.32607 6.68033 4.22254 6.63314 4.1086C6.58594 3.99466 6.56165 3.87254 6.56165 3.74922C6.56165 3.62589 6.58594 3.50377 6.63314 3.38983C6.68033 3.27589 6.74951 3.17236 6.83672 3.08515C6.92392 2.99795 7.02745 2.92877 7.14139 2.88158C7.25533 2.83438 7.37745 2.81009 7.50078 2.81009C7.62411 2.81009 7.74623 2.83438 7.86017 2.88158C7.97411 2.92877 8.07763 2.99795 8.16484 3.08515L14.4148 9.33515C14.5021 9.42235 14.5714 9.52593 14.6185 9.63994C14.6657 9.75395 14.6899 9.87615 14.6898 9.99954C14.6897 10.1229 14.6652 10.2451 14.6177 10.359C14.5702 10.4729 14.5008 10.5763 14.4133 10.6633Z"
              fill="#241303"
            />
          </svg>
        </button>
      </div>
      <div className="hnera">
        {products.filter(product => product.is_discount === true && product.stock_available > 0).map((product,index)=>{
          const sellP=Number(product.pr_act_price)-Number(product.pr_disc);
          return(
            <Link to={`/prodind/${product.id}`} state={{product}} key={product.id} style={{ textDecoration: "none", color: "inherit" }}>
          <div key={index} className="hneraind">
          <div class="card">
            <img src={Individual} alt="Currency Note" class="card-img" />
            <div class="price-tag qto-bold">${sellP}</div>
          </div>
          <h1>{product.pr_name}</h1>
          <p>{product.rating} Rating</p>
        </div>
        </Link>
        );
        })}
        
        {/* <div className="hneraind">
          <div class="card">
            <img src={Individual} alt="Currency Note" class="card-img" />
            <div class="price-tag qto-bold">$30</div>
          </div>
          <h1 className="qto-bold">The coin bank</h1>
          <p className="qto-regular">4.8 Rating</p>
        </div> */}
        
      </div>
      <div className="sthalam"></div>
        <div className="sthalam"></div>
        <div className="sthalam"></div>
        <div className="sthalam"></div>
        {/* <div className="sthalam"></div> */}
        {/* <div className="sthalam"></div> */}
    </div>
  );
}

export default Home;
