// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import ProductInd from './pages/ProductInd/ProductInd';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Sucess from './pages/Sucess/Sucess';
import YourOrder from './pages/YourOrder/YourOrder';
import PurchaseDet from './pages/PurchaseDet/PurchaseDet';

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login></Login>}/>
          <Route path='/signup' element={<Signup></Signup>}/>
          <Route path='/home' element={<Home></Home>}/>
          <Route path='/prodind' element={<ProductInd></ProductInd>}/>
          <Route path='/cart' element={<Cart></Cart>}/>
          <Route path='/check' element={<Checkout></Checkout>}/>
          <Route path='/sucess' element={<Sucess></Sucess>}/>
          <Route path='/yorder' element={<YourOrder></YourOrder>}/>
          <Route path='/purchase' element={<PurchaseDet></PurchaseDet>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
