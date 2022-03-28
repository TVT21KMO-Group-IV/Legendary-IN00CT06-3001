import './App.css';
import Login from './components/Login';
import RegisterView from './components/RegisterView';
import React from 'react';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import RestaurantView from './components/RestaurantView';
import Restaurantss from './components/Restaurantss';
import Search from './components/Search';
import NavBar from './components/NavBar';
import Register from './components/Register';
import GetMenu from './components/GetMenu';



function App ()  {




  return (<div className=''>
     
  
    <BrowserRouter>

      <NavBar />
        <Routes>
          <Route path="/Login" element={ <Login/> } />
          <Route path="/Register" element={ <Register/>} />
          <Route path="/" element={ <Restaurantss/> } />
          <Route path="/menuitem/:idmenu" element={ <GetMenu /> } />
        </Routes>

    
    </BrowserRouter>
    
    </div>
  );
}

export default App;
