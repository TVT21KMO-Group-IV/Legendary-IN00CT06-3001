import React from 'react'
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


export default function Restaurantss (props) {

const [restaurants, setRestaurants] =useState([]);
//const [menus, setMenus] =useState([]);


  useEffect(async() => {
    const allrestaurants = await fetch('http://localhost:5000/restaurant').then((res)=>
    res.json()
    )
    
    console.log(allrestaurants)
    setRestaurants( allrestaurants )
  },[]);

  // useEffect(async(idRestaurant) => {
  //   const oneMenu = await fetch(`http://localhost:5000/menuitem/${idRestaurant}`).then((res)=>
  //   res.json()
  //   )
    
  //   console.log(oneMenu)
  //   setMenus( oneMenu )
  // },[]);

  const [rest, setRest] = useState('');
  const filter = (e) => {
    const keyw = e.target.value;
    console.log("testi");
    setRest(keyw);
  };
  let filteredRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(rest.toLowerCase()) || restaurant.type.toLowerCase().includes(rest.toLowerCase()))
  

      return (
        
        <div >
          <div className="paddingBottom">
        <input
          type="search"
          value={rest}
          onChange={filter}
          className="searchBar"
          placeholder="Etsi ravintolaa nimellä tai ravintolatyypillä"
        /></div>
      
      <div className="marginTop">
      <div className="paddingTop">
          { filteredRestaurants.length ? filteredRestaurants.map((restaurants) => (
            <div key={restaurants.idRestaurant} className='restaurantHome'><img src={ restaurants.restaurantImg} className='restaurantImg'/>
            <div className='restaurantHomeText' >{restaurants.name} {restaurants.address}
             
            <div><Link to={`/menuitem/${restaurants.idRestaurant}`}><button className='homeMenuButton' >Avaa ravintolan ruokalista</button></Link></div></div></div>
          )):<div><h1>Hakuehdoillasi ei löydy ravintolaa</h1></div>}

</div>
          </div>
      </div>);   
  }

  