import './App.css';
import Login from './components/Login';
import RegisterView from './components/RegisterView';
import React from 'react';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RestaurantView from './components/RestaurantView';


function App() {

  // const [restaurants, setRestaurants] = useState([]);

  // useEffect(async() => {
  //   const allrestaurants = await fetch('http://localhost:5000/restaurant').then((res)=>
  //   res.json()
  //   )
  //   setRestaurants(allrestaurants)
  //   console.log(allrestaurants)
  // },[])

  // let output = <RestaurantView restaurants = { restaurants } />;  //tän pitäs hakee ravintolat outputtiin, ei toimi
  // { output } pitäs tulostaa
  return (<div>
     
  
    <BrowserRouter>
    <div className="App">
      <h1>Food4U</h1>
      <Routes>
        <Route path="/" element={ <Login/> } />
        
        <Route path="RegisterView" element={ <RegisterView /> } />

      </Routes>
      
    </div>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
