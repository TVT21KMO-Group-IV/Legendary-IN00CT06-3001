import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Menus(props) {

  const [menus, setMenus] = useState([]);
  const { restaurantId } = useParams();
  const [restaurants, setRestaurants] = useState([]);

  console.log(restaurantId);


  useEffect(async () => {
    const restaurantMenu = await fetch(`http://localhost:5000/restaurant/${restaurantId}/menu`).then((res) =>
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
            <div className="menuSearch"><input type="search" className="" placeholder="Etsi ruokalistalta" /></div>
            <div className="menuListDishes">Näytä: <a href="#">Pääruoka</a> - <a href="#">Jälkiruoka</a> - <a href="#">Iltapala</a></div>
          </div>
        </>
      )}

      <div className="restaurantMenuDisplay">


        <div className="dish">
          <h2 className="dishTitle">menu.dish</h2>
          <div className="menuDishItems">

            {menus.map(menu =>
              <>
                <div className="itemWrapper">
                  <div className="dishItem">
                    <div className="dishImg"><img src="https://via.placeholder.com/100" /></div>
                    <div className="dishDetails">
                      <strong>{menu.name}</strong>
                      <p>{menu.description}</p>
                      <p>{menu.price} €</p>
                    </div>
                    <div className="addToCartIcon"><i class="fas fa-cart-plus" /></div>
                  </div>
                </div>
              </>
            )
            }

          </div>
        </div>

      </div>


    </div>
  );
}
