import './App.css';
import Login from './components/Login';
import RegisterView from './components/RegisterView';
import React from 'react';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import RestaurantView from './components/RestaurantView';
import Restaurantss from './components/Restaurantss';
import Search from './components/Search';


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
    <div>
      <h1 className="food4uTopic">Food4U<Link to="/Login" className='topicButton'><button>Login</button></Link></h1>
 
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
