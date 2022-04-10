import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


export default function GetMenu () {

  
    const [cartItems, setCartItems] = useState([]);
    const [menus, setMenus] =useState([]);
    const {restaurantId} = useParams();
    const [restaurants, setRestaurants] = useState([]);
    const itemsPrice = cartItems.reduce((a, c) => a + 1 * c.price, 0);
    const delPrice = 3.90;
    const totalPrice = itemsPrice + delPrice;
   
        
  console.log(restaurantId);

    
  useEffect(async() => {
    const restaurantMenu = await fetch(`http://localhost:5000/restaurant/${restaurantId}/menu`).then((res)=>
    res.json()

    )

    console.log(restaurantMenu)
    setMenus(restaurantMenu)
  }, []);

  useEffect(async () => {
    const restaurant = await fetch(`http://localhost:5000/restaurant/${restaurantId}/restaurant`).then((res) =>
      res.json()
    )

    console.log(restaurant)
    setRestaurants(restaurant)
  }, []);

  const [menuItemFilter, setRest] = useState('');
  const filter = (e) => {
    const keyw = e.target.value;
    setRest(keyw);
  };

  let filteredMenuItems = menus.filter(menuItem => menuItem.name.toLowerCase().includes(menuItemFilter.toLowerCase()) || menuItem.description.toLowerCase().includes(menuItemFilter.toLowerCase()))

  const addToCart = (menus) => {
    setCartItems([...cartItems, {...menus}]);
  };

  const removeFromCart = (menuToRemove) => {
    setCartItems(
      cartItems.filter((menus) => menus !== menuToRemove)
      );
  };


  return (
    <div className="restaurantWrapper">

      {restaurants.map(rest =>

        <>
          <div className='restaurantMainImg' style={{ backgroundImage: `url(${rest.restaurantImg})`, backgroundRepeat: 'no-repeat' }}> </div>
          <div className='restaurantDetails'>
            <div><h1 className='restaurantName'>{rest.name}</h1></div>
            <div><i class="fas fa-money-bill-alt"></i>{rest.pricerange} <i class="fas fa-tags"></i>{rest.type}</div>
            <div><i class="fas fa-map-marked" />{rest.address} <i class="fas fa-clock"></i>{rest.openingHours}</div>
          </div>
          <div className="restaurantMenuFunctions">
            <div className="menuSearch"><input type="search" value={menuItemFilter} onChange={filter} className="" placeholder="Etsi ruokalistalta" /></div>
            
          </div>
        </>
      )}
     
      <div className="restaurantMenuDisplay">

      
            <div className="dish">
              
              <div className="menuDishItems">

                {filteredMenuItems.length ? filteredMenuItems.map((menus) => (
                  <>
                    <div className="itemWrapper">
                      <div className="dishItem">
                        <div className="dishImg"><img src="https://via.placeholder.com/100" /></div>
                        <div className="dishDetails">
                          <strong>{menus.name}</strong>
                          <p>{menus.description}</p>
                          <p>{menus.price} €</p>
                        </div>
                        <div className="addToCartIcon"><button onClick={() => addToCart(menus)}>Lisää ostoskoriin</button><i class="fas fa-cart-plus" /></div>

                      </div>
                    </div>
                  </>
                )) : <div>Tällaista annosta ei löydy, koita jotain muuta hakusanaa.</div>
                }
              </div>
            </div>
     
      </div>
    
    <div className="cart">
    <h2>Ostoskori</h2>
      
      {cartItems.length === 0 && <div className='cart-item-name'>Ostoskorisi on tyhjä</div>}
      {cartItems.map((item) => (
        <div key={item.id}>
          <div className="cart-item-name">{item.name} {item.price.toFixed(2)}€
          <button className ="removebtn" onClick={() => removeFromCart(item)}><i class="fas fa-trash" /></button>
          
            
          </div>
          </div>
      ))}

      {cartItems.length !== 0 && (
        <>
          <hr />
          <div className="cart-price-name">Ostokset:</div>
          <div className="cart-price-price">{itemsPrice.toFixed(2)}€</div>
         
          <div className="cart-price-name">Toimituskulut:</div>
          <div className="cart-price-price"> {delPrice.toFixed(2)}€ </div>
          
          <hr />
          <div className="total">
            <strong>Yhteensä:</strong>
          </div>
            <div className="totalPrice">
              <strong>{totalPrice.toFixed(2)}€</strong>
            </div>
          
          <hr />
          <div className='cartAddress'>
          <form><input type="text"  placeholder='Osoite' className='loginInsertBox' ></input></form>
          </div>
          
          <div className="cartbtns">
          <Link className="continuebtn" to ="/" title="Jatka ostoksia"><button>Peruuta</button></Link>
          <Link className="paybtn" to ="/Pay" title="Maksa"><button>Siirry maksamaan</button></Link>
          </div>
        </>
      )}
    </div>
  </div>
  );
}

