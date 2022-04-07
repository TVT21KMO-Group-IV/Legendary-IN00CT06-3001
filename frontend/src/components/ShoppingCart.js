import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ShoppingCart(props) {

  const {cartItems, removeFromCart} =  props;
  const itemsPrice = cartItems.reduce((a, c) => a + 1 * c.price, 0);
  const delPrice = 3.90;
  const totalPrice = itemsPrice + delPrice;
  return (
    <aside className="cart">
      <h2>Ostoskori</h2>
      <div>
        {cartItems.length === 0 && <div>Ostoskorisi on tyhjä</div>}
        {cartItems.map((item) => (
          <div key={item.id}>
            <div className="cart-item-name">{item.name} {item.price.toFixed(2)}€
            <button onClick={() => removeFromCart(item)} className="removebtn">
                Poista
              </button>{' '}
              
            </div>

            <div className="cart-item-price">
              
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="cart-price-name">Ostokset:</div>
              <div className="cart-price-price">{itemsPrice.toFixed(2)}€</div>
            </div>
            
            <div className="row">
              <div className="cart-price-name">Toimituskulut:</div>
              <div className="cart-price-price">
                {delPrice.toFixed(2)}€
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="total">
                <strong>Yhteensä:</strong>
              </div>
              <div className="totalPrice">
                <strong>{totalPrice.toFixed(2)}€</strong>
              </div>
            </div>
            <hr />
            <div className="cartbtns">
            <Link className="continuebtn" to ="/" title="Jatka ostoksia"><button>Jatka ostoksia</button></Link>
            <Link className="paybtn" to ="/Pay" title="Maksa"><button>Siirry maksamaan</button></Link>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
    