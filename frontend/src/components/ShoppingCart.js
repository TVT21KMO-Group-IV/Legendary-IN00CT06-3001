import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ShoppingCart(props) {

  const {cartItems, setCartItems, handleQty} =  props;
  const [price, setPrice] = useState(0);

  const removeFromCart = (id) =>{
    const arr = cartItems.filter((menu) => menu.idMenuItem !== id);
    setCartItems(arr);
    handlePrice();
  }

  const handlePrice = () =>{
    let ans = 0;
    cartItems.map((menu) => (ans += menu.amount * menu.price));
    setPrice(ans);
  };
  
  useEffect(() =>{
    handlePrice();
  });

  
    return (
    
            <div>
                <h1>OSTOSKORI:</h1>
                {cartItems.map((menu) => (
                <div key ={menu.idMenuItem}><h3>{menu.name}</h3>
                <div>Hinta: {menu.price}€
                <div> 
                <button onClick={() => handleQty(menu, 1)}> + </button>
                <button>{menu.amount}</button>
                <button onClick={() => handleQty(menu, -1)}> - </button></div></div>
                <div>
                  <button onClick={() => removeFromCart(menu.idMenuItem)}>Poista</button>
                </div></div>
                ))}
                
                <div><h3>Yhteensä: {price}€ </h3></div>
              
    </div>
    )
            }