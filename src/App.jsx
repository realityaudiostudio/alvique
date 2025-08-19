// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import ProductInd from './pages/ProductInd/ProductInd';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Sucess from './pages/Sucess/Sucess';
import YourOrder from './pages/YourOrder/YourOrder';
import PurchaseDet from './pages/PurchaseDet/PurchaseDet';
import Profile from './pages/Profile/Profile';
import PrivateRoute from './Route/PrivateRoute/PrivateRoute';
import { AuthProvider } from './authContext/authContext';
import CancellationRefund from './pages/Policies/cancellation-refund';
import Terms from './pages/Policies/terms';
import Shipping from './pages/Policies/shipping';
import Privacy from './pages/Policies/privacy';
import Contact from './pages/Policies/contact';


function App() {
  

  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to="/home" />} />
          <Route path='/login' element={<Login></Login>}/>
          <Route path='/signup' element={<Signup></Signup>}/>
          <Route path='/home' element={<Home></Home>}/>
          <Route path='/prodind/:id' element={<ProductInd></ProductInd>}/>
          <Route path='/cart' element={<PrivateRoute><Cart></Cart></PrivateRoute>}/>
          <Route path='/check' element={<PrivateRoute><Checkout></Checkout></PrivateRoute>}/>
          <Route path='/sucess' element={<PrivateRoute><Sucess></Sucess></PrivateRoute>}/>
          <Route path='/yorder' element={<YourOrder></YourOrder>}/>
          <Route path='/purchase' element={<PurchaseDet></PurchaseDet>}/>
          <Route path='/profile' element={<PrivateRoute><Profile></Profile></PrivateRoute>}/>
          <Route path='/cancellation-refund' element={<CancellationRefund/>}/>
          <Route path='/terms' element={<Terms/>}/>
          <Route path='/shipping' element={<Shipping/>}/>
          <Route path='/privacy' element={<Privacy/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </Router>
      </AuthProvider>
    </>
  )
}

export default App
