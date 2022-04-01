import React, { useState, useEffect, Component } from 'react'
import { useParams } from 'react-router-dom';

function AddRestaurant() {

 
    const [ name, setName ] = useState('');
    const [ type, setType ] = useState('');
    const [ pricerange, setPricerange ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ openingHours, setOpeningHours ] = useState('');
    const [ restaurantImg, setRestaurantImg ] = useState('');
    const [ message, setMessage] = useState("");  // to store success or error message

let addSubmit = async (e) => {
    e.preventDefault();
 try {        
    let res = await fetch(`http://localhost:5000/restaurant`, {
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
      <form onSubmit={ addSubmit }>
        <div></div>
        <input
          type="text"
          value={name}
          placeholder="Ravintolan nimi"
          onChange={(e) => setName(e.target.value)}
        />
        <div></div>
        <input
          type="text"
          value={type}
          placeholder="Ravintolan tyyppi"
          onChange={(e) => setType(e.target.value)}
        />
        <div></div>
        <input
          type="text"
          value={pricerange}
          placeholder="Hintaluokka"
          onChange={(e) => setPricerange(e.target.value)}
        />
        <div></div>
        <input
          type="text"
          value={address}
          placeholder="Osoite"
          onChange={(e) => setAddress(e.target.value)}
        /><div></div>
        <input
          type="text"
          value={openingHours}
          placeholder="Aukioloajat"
          onChange={(e) => setOpeningHours(e.target.value)}
        /><div></div>
        <input
          type="text"
          value={restaurantImg}
          placeholder="URL ravintolan kuvaan"
          onChange={(e) => setRestaurantImg(e.target.value)}
        /><div></div>

        <button type="submit">Luo ravintola</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}
export default AddRestaurant;
