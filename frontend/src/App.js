import './App.css';
import Login from './components/Login';
import RegisterView from './components/RegisterView';
import React from 'react';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import RestaurantView from './components/RestaurantView';
// View to view all restaurants
import Restaurantss from './components/Restaurantss';
// View for a single restaurant
import Restaurant from './components/Restaurant';
import Search from './components/Search';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Menu from './components/Menu';
import Footer from './components/Footer';
import GetMenu from './components/GetMenu';
import AddRestaurant from './components/AddRestaurant';
import AddMenu from './components/AddMenu'
import ShoppingCart from './components/ShoppingCart';

function App ()  {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (menu) => {
    setCartItems([...cartItems, {...menu}]);
  };

  const removeFromCart = (menuToRemove) => {
    setCartItems(
      cartItems.filter((menu) => menu !== menuToRemove)
      );
  };


  return (<div className='pageWrapper'>
     
  
    <BrowserRouter>

      <NavBar cartItems={cartItems}/>
        <Routes>
          <Route path="/Login" element={ <Login/> } />
          <Route path="/Register" element={ <Register/>} />
          <Route path="/" element={ <Restaurantss/> } />
          <Route path="/Restaurant" element={ <Restaurant/> } />
          <Route path="/restaurant/:restaurantId" element={ <GetMenu cartItems={cartItems} addToCart={addToCart} /> } />
          <Route path="/ShoppingCart" element={ <ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path="/Menuitem" element={ <Menu /> } />
          <Route path="/restaurant/:restaurantId" element={ <GetMenu /> } />
          <Route path="/addRestaurant" element={ <AddRestaurant /> } />
          <Route path="/AddMenu/:restaurantId" element={ <AddMenu /> } />
        </Routes>
      <Footer />
          
    </BrowserRouter>
    
    </div>
  );
}

export default App;
