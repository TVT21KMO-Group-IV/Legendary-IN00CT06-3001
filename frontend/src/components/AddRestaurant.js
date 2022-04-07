import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../App.css';

function AddRestaurant() {

    const [ name, setName ] = useState('');
    const [ type, setType ] = useState('');
    const [ pricerange, setPricerange ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ openingHours, setOpeningHours ] = useState('');
    const [ restaurantImg, setRestaurantImg ] = useState('');
    const [ message, setMessage] = useState();  // to store success or error message

let addSubmit = async (e) => {
    e.preventDefault();
 try {        
    let res = await fetch(`http://localhost:5000/addrestaurant` , {
    method: 'POST',
    headers: {"Content-Type": "application/json",
  },
    body: JSON.stringify( {
        name: name,
        type: type,
        pricerange: pricerange,
        address: address,
        openingHours: openingHours,
        restaurantImg: restaurantImg,
    }),
}).then((res)=>
res.json());

    if (res.status === 200) {
        setName('');
        setType('');
        setPricerange('');
        setAddress('');
        setOpeningHours('');
        setRestaurantImg('');
        setMessage('Ravintola lisätty!');
    } else {
        setMessage("Error occured");
    }
} catch(err){
    console.log(err);

    }
};

return (
    <div className="App">
      <div className='createBox'><h1>Luo uusi ravintola</h1></div>
      <form onSubmit={ addSubmit }>
        <div className='addText'>Ravintolan nimi: 
        <input className='addBox' required="required"
          type="text"
          value={name}
          placeholder="Ravintolan nimi"
          onChange={(e) => setName(e.target.value)}
        /></div>
        <div className='addText'>Ravintolan osoite: 
        <input className='addBox' required="required"
          type="text"
          value={address}
          placeholder="Osoite"
          onChange={(e) => setAddress(e.target.value)}
        /></div>
        <div className='addText'>Ravintolan tyyppi: 
        <select className='addBox2'
          type="text"
          value={type}
          placeholder="Ravintolan tyyppi"
          onChange={(e) => setType(e.target.value)}>
            <option value="Casual Dining">Casual Dining</option>
            <option value="Pizzeria">Pizzeria</option>
            <option value="Kebabravintola">Kebabravintola</option>
            <option value="Pihviravintola">Pihviravintola</option>
            <option value="Buffet">Buffet</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Fast Casual">Fast Casual</option>
            <option value="Fine Dining">Fine Dining</option>
        </select></div>
        <div className='addText'>Hintaluokka: 
        <select className='addBox2'
          type="text"
          value={pricerange}
          onChange={(e) => setPricerange(e.target.value)}>
            <option value="€">€</option>
            <option value="€€">€€</option>
            <option value="€€€">€€€</option>
            <option value="€€€€">€€€€</option>
        </select></div>        
        <div className='addText'>Ravintolan aukioloajat: 
        <input className='addBox' required="required"
          type="text"
          value={openingHours}
          placeholder="Aukioloajat"
          onChange={(e) => setOpeningHours(e.target.value)}
        /></div>
        <div className='addText'>URL ravintolan kuvaan: 
        <input className='addBox' 
          type="text"
          value={restaurantImg}
          placeholder="URL ravintolan kuvaan"
          onChange={(e) => setRestaurantImg(e.target.value)}
        /></div>        
        <div className='addText'>
          Tähän ownerId useParams kautta kun token on joskus saatu tehtyä
        </div>
        <div className='createBox'>

        <button  className='createBox'type="submit">Luo ravintola</button>
        </div>
        <div className="message">{message ? <p>Ravintola lisätty</p> : null}</div>
      </form>
    </div>
  );
}
export default AddRestaurant;

