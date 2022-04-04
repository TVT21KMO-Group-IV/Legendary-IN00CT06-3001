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




function App ()  {




  return (<div className='pageWrapper'>
     
  
    <BrowserRouter>

      <NavBar />
        <Routes>
          <Route path="/Login" element={ <Login/> } />
          <Route path="/Register" element={ <Register/>} />
          <Route path="/" element={ <Restaurantss/> } />
          <Route path="/Restaurant" element={ <Restaurant/> } />
          <Route path="/Menuitem" element={ <Menu /> } />
          <Route path="/restaurant/:restaurantId" element={ <GetMenu /> } />

        </Routes>
      <Footer />
          
    </BrowserRouter>
    
    </div>
  );
}

export default App;
