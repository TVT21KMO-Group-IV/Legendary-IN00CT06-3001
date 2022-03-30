import React, { useState } from 'react'
import { Link } from 'react-router-dom'



export default function ShoppingCart(props) {
    const { cartItems } = props;
    

  return (
    <div className=''>
        <h1>Shopping cart</h1>
        <div>
            {cartItems.lenght === 0 && <div>Cart is empty</div>}
        </div>
       
    </div>
  )
}
