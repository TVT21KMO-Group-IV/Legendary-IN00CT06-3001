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
                        <div className="addToCartIcon"><i onClick={() => addToCart(menus)} class="fas fa-cart-plus" /></div>

                      </div>
                    </div>
                  </>
                )) : <div className="information">Tällaista annosta ei löydy, koita jotain muuta hakusanaa.</div>
                }
              </div>
            </div>
     
      </div>
    </div>
  );
}

