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


function App ()  {



   //=> {
//     if (!query) {
//         return Restaurantss;
//     }

//     return restaurant.filter((restaurant) => {
//         const restaurantName = restaurant.name.toLowerCase();
//         return restaurantName.includes(query);
//     });
// };
const [searchRestaurant, setSearchRestaurant] = useState("");


  return (<div className=''>
     
  
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/Login" element={ <Login/> } />
          <Route path="/Register" element={ <Register/>} />
          <Route path="/" element={ <Restaurantss/> } />
        </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
