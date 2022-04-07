import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ShoppingCart(props) {

  const {cartItems, removeFromCart} =  props;
  const itemsPrice = cartItems.reduce((a, c) => a + 1 * c.price, 0);
  const delPrice = 3.90;
  const totalPrice = itemsPrice + delPrice;
  return (
    <aside className="block col-1">
      <h2>Ostoskori</h2>
      <div>
        {cartItems.length === 0 && <div>Ostoskori on tyhjä</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}
            <button onClick={() => removeFromCart(item)} className="remove">
                Poista ostoskorista
              </button>{' '}
              
            </div>

            <div className="col-2 text-right">
              {item.price.toFixed(2)}€
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Ostokset:</div>
              <div className="col-1 text-right">{itemsPrice.toFixed(2)}€</div>
            </div>
            
            <div className="row">
              <div className="col-2">Toimituskulut:</div>
              <div className="col-1 text-right">
                {delPrice.toFixed(2)}€
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-2">
                <strong>Yhteensä:</strong>
              </div>
              <div className="col-1 text-right">
                <strong>{totalPrice.toFixed(2)}€</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button>
                Maksa
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
    