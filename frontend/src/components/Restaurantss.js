import React from 'react'
import {useState, useEffect} from 'react';


export default function Restaurantss (props) {

const [restaurants, setRestaurants] =useState([]);



  useEffect(async() => {
    const allrestaurants = await fetch('http://localhost:5000/restaurant').then((res)=>
    res.json()
    )
    
    console.log(allrestaurants)
    setRestaurants( allrestaurants )
  },[]);

  return (

    

    <div className="">
        { restaurants.map ( rafla => <div className='restaurantHome'> <img src={ rafla.restaurantImg} className='restaurantImg'/>
        <div className='restaurantHomeText' > { rafla.name } { rafla.address } </div>
        <div className='homeMenuButton' ><button>Avaa menu</button></div></div>)}
        
    </div>);   
}
