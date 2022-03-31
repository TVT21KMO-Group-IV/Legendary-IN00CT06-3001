import React, { useState } from 'react'
import { Link } from 'react-router-dom'



export default function ShoppingCart(cartItems) {
    
  const removeFromCart = (menuToRemove) =>{
    console.log("removed");
    setCartItems(cartItems.filter((menu) => menu !== menuToRemove));
  };
 

  return (
    <div>
            <h1>CART:</h1>
            {menus.map((menu, idx) => (
                <div key ={idx}><h3>{menu.name}</h3>
                <div>Annoksen kuvaus: {menu.description} Hinta: {menu.price}€ 
                <button onClick={() => removeFromCart(menu)}>Poista ostoskorista</button></div></div>
              ))}
              
    </div>
      );
      }
