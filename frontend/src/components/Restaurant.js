import React from 'react'
import { useState, useEffect } from 'react';


export default function Restaurants(props) {

    const [restaurants, setRestaurants] = useState([]);



    useEffect(async () => {
        const onerestaurant = await fetch('http://localhost:5000/single-restaurant').then((res) =>
            res.json()
        )

        console.log(onerestaurant)
        setRestaurants(onerestaurant)
    }, []);

    return (



        <div className="restaurantWrapper">
            {restaurants.map(rafla =>
                <div>
                    <div className='restaurantMainImg'> <img src={rafla.restaurantImg} /></div>
                    <div className='restaurantDetails'>
                        <div><h1>{rafla.name}</h1></div>
                        <div><i class="fas fa-money-bill-alt"></i>{rafla.pricerange} <i class="fas fa-tags"></i>{rafla.type}</div>
                        <div><i class="fas fa-map-marked" />{rafla.address} <i class="fas fa-clock"></i>{rafla.openingHours}</div>
                    </div>
                    <div className="restaurantMenuFunctions">
                        <div className="menuSearch"><input type="search" className="" placeholder="Etsi ruokalistalta" /></div>
                        <div className="menuListDishes">Näytä: <a href="#">Pääruoka</a> - <a href="#">Jälkiruoka</a> - <a href="#">Iltapala</a></div>
                    </div>
                    <div className="restaurantMenuDisplay">
                        <div className="dish">
                            <h2 className="dishTitle">Pääruoka</h2>
                            <div className="menuDishItems">
                                <div className="dishItem">
                                    <div className="dishImg"><img src="https://via.placeholder.com/100" /></div>
                                    <div className="dishDetails">
                                        <strong>Annos 1</strong>
                                        <p>10 €</p>
                                    </div>
                                    <div className="addToCartIcon"><i class="fas fa-cart-plus" /></div>
                                </div>
                                <div className="dishItem">
                                    <div className="dishImg"><img src="https://via.placeholder.com/100" /></div>
                                    <div className="dishDetails">
                                        <strong>Annos 2 jolla on pidempi nimi</strong>
                                        <p>10 €</p>
                                    </div>
                                    <div className="addToCartIcon"><i class="fas fa-cart-plus" /></div>
                                </div>
                                <div className="dishItem">
                                    <div className="dishImg"><img src="https://via.placeholder.com/100" /></div>
                                    <div className="dishDetails">
                                        <strong>Annos 3</strong>
                                        <p>10 €</p>
                                    </div>
                                    <div className="addToCartIcon"><i class="fas fa-cart-plus" /></div>
                                </div>
                                <div className="dishItem">
                                    <div className="dishImg"><img src="https://via.placeholder.com/100" /></div>
                                    <div className="dishDetails">
                                        <strong>Annos 4</strong>
                                        <p>10 €</p>
                                    </div>
                                    <div className="addToCartIcon"><i class="fas fa-cart-plus" /></div>
                                </div>
                            </div></div>

                        <div className="menuDish">
                            <h2 className="dishTitle">Jälkiruoka</h2>
                        </div>
                        <div className="menuDish">
                            <h2 className="dishTitle">Iltapala</h2>
                        </div>
                    </div>
                </div>)}
        </div>
    );
}
