import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Menus (props) {

    const [menus, setMenus] =useState([]);
    const {restaurantId} = useParams();
        
  console.log(restaurantId);

    
  useEffect(async() => {
    const restaurantMenu = await fetch(`http://localhost:5000/restaurant/${restaurantId}/menu`).then((res)=>
    res.json()
    )
    
    console.log(restaurantMenu)
    setMenus( restaurantMenu )
  },[]);

   
      return (
          <div>
              {menus.map(menu => 
                  
              <div key ={restaurantId.idRestaurant}>{menu.name}<div>{menu.description} {menu.price}</div>
              <button>testinappi</button></div>
              )
              }
          </div>
      )
      }
