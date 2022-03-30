import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Menus (props) {

    const [menus, setMenus] =useState([]);
    const {restaurantId} = useParams();
    const [restaurants, setRestaurants] = useState([]);
    const [cartItems, setCartItems] = useState([]);
        
  console.log(restaurantId);

    
  useEffect(async() => {
    const restaurantMenu = await fetch(`http://localhost:5000/restaurant/${restaurantId}/menu`).then((res)=>
    res.json()
    )
    
    console.log(restaurantMenu)
    setMenus( restaurantMenu )
  },[]);

  useEffect(async() => {
    const restaurant = await fetch(`http://localhost:5000/restaurant/${restaurantId}/restaurant`).then((res)=>
    res.json()
    )
    
    console.log(restaurant)
    setRestaurants( restaurant )
  },[]);

  const onAdd = (menu) =>{
    
  }

   
      return (
          <div>

            {restaurants.map(rest =>
               <div key ={restaurantId.idRestaurant}>{rest.name}</div>
              )}
              {menus.map(menu => 
                <div key ={restaurantId.idRestaurant}>{menu.name}<div>
                  Annoksen kuvaus: {menu.description}, Hinta: {menu.price}€  
                <button>Lisää ostoskoriin</button></div></div>
              )
              }
          </div>
      )
      }
