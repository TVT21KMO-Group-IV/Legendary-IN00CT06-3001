import React from 'react'
import {useState, useEffect} from 'react';
import Search from './Search';


export default function Restaurantss (props) {

const [restaurants, setRestaurants] =useState([]);



  useEffect(async() => {
    const allrestaurants = await fetch('http://localhost:5000/restaurant').then((res)=>
    res.json()
    )
    
    console.log(allrestaurants)
    setRestaurants( allrestaurants )
  },[]);

  const [rest, setRest] = useState('');
  const filter = (e) => {
    const keyw = e.target.value;
    console.log("testi");
    setRest(keyw);
  };
  let filteredRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(rest.toLowerCase()))


      return (
        <div className="">
        <input
          type="search"
          value={rest}
          onChange={filter}
          className="searchBar"
          placeholder="Etsi ravintolaa nimellä"
        />
      
  
      <div className="">
          { filteredRestaurants.length ? filteredRestaurants.map((restaurants) => (
            <div key={restaurants.idRestaurant} className='restaurantHome'><img src={ restaurants.restaurantImg} className='restaurantImg'/>
            <div className='restaurantHomeText' >{restaurants.name} {restaurants.address}
            <div className='homeMenuButton' ><button>Avaa menu</button></div></div></div>
          )):<div><h1>Hakuehdoillasi ei löydy ravintolaa</h1></div>}

          
          </div>
      </div>);   
  }