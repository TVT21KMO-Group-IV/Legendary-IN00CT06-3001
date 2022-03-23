import './App.css';
import Login from './components/Login';
import RegisterView from './components/RegisterView';
import React from 'react';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RestaurantView from './components/RestaurantView';
import Restaurantss from './components/Restaurantss';
import Search from './components/Search';


function App() {






  return (<div className=''>
     
  
    <BrowserRouter>
    <div>
      <h1 className="food4uTopic">Food4U<button className='topicButton'>test</button></h1>
      <Search />
      <Routes>
        <Route path="/Login" element={ <Login/> } />
        <Route path="/" element={ <Restaurantss/> } />
        <Route path="RegisterView" element={ <RegisterView /> } />

      </Routes>
      
    </div>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
