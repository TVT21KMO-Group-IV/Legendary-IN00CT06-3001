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
import ShoppingCart from './components/ShoppingCart';



function App ()  {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (menu) =>{
    if (cartItems.indexOf(menu) !== -1)
    return;
    setCartItems([...cartItems, menu]);
    };

    const handleQty = (menu, d) =>{
      const ind = cartItems.indexOf(menu);
      const arr = cartItems;
      arr[ind].amount += d;
      if (arr[ind].amount === 0) arr[ind].amount = 1;
      setCartItems([...arr]);
    };
/*
    useEffect(() =>{
      console.log("cart change");
    }, [cartItems]);
*/

  return (<div className=''>
     
  
    <BrowserRouter>

      <NavBar cartItems={cartItems}/>
        <Routes>
          <Route path="/Login" element={ <Login/> } />
          <Route path="/Register" element={ <Register/>} />
          <Route path="/" element={ <Restaurantss/> } />
          <Route path="/Restaurant" element={ <Restaurant/> } />
          <Route path="/Menuitem" element={ <Menu /> } />
          <Route path="/restaurant/:restaurantId" element={ <GetMenu cartItems={cartItems} addToCart={addToCart} /> } />
          <Route path="/ShoppingCart" element={ <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} handleQty={handleQty} />} />
        </Routes>
      <Footer />
          
    </BrowserRouter>
    
    </div>
  );
}

export default App;
