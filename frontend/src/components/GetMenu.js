import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function GetMenu (props) {

  const {addToCart} =  props;

    const [menus, setMenus] =useState([]);
    const {restaurantId} = useParams();
    const [restaurants, setRestaurants] = useState([]);
   
        
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

  

 
        return (
          <div>
            <h1>MENU:</h1>
            {restaurants.map(rest =>
               <div key ={restaurantId.idRestaurant}><h2>{rest.name}</h2></div>
            )}

              {menus.map((menu) => (
                <div key ={menu.idMenuItem}><h3>{menu.name}</h3>
                <div>Annoksen kuvaus: {menu.description} Hinta: {menu.price}€
                <button onClick={() => addToCart(menu)}>Lisää ostoskoriin</button></div></div>
                
              ))}
  
                
                
        </div>
      );
}
