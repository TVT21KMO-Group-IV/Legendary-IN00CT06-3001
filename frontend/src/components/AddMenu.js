import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../App.css';

function AddMenu() {
    const [menus, setMenus] =useState([]);
    const [ dish, setDish ] = useState('');
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ menuItemImg, setMenuItemImg ] = useState('');
    const { restaurantId } = useParams('');
    const [ message, setMessage] = useState();  // to store success or error message

let addSubmit = async (e) => {
    e.preventDefault();
 try {        
    let res = await fetch(`http://localhost:5000/menuitem/${restaurantId}` , {
    method: 'POST',
    headers: {"Content-Type": "application/json",
  },
    body: JSON.stringify( {
        dish: dish,
        name: name,
        description: description,
        price: price,
        menuItemImg: menuItemImg,
        
    }),
}).then((res)=>
res.json());

    if (res.status === 200) {
        setDish('');
        setName('');
        setDescription('');
        setPrice('');
        setMenuItemImg('');
        
        setMessage('Annos lisätty!');
    } else {
        setMessage("Error occured");
    }
} catch(err){
    console.log(err);

    }
};
useEffect(async() => {
    const restaurantMenu = await fetch(`http://localhost:5000/restaurant/${restaurantId}/menu`).then((res)=>
    res.json()
    )
    
    console.log(restaurantMenu)
    setMenus( restaurantMenu )
  },[]);
return (
    <div className="App">
      <div className='createBox'><h1>Lisää uusi annos</h1></div>
      <form onSubmit={ addSubmit }>
      <div className='addText'>Ruokatyyppi: 
        <select className='addBox2'
          type="text"
          value={dish}
          placeholder="Annoksen tyyppi"
          onChange={(e) => setDish(e.target.value)}>
            <option value="">Alkuruoka</option>
            <option value="">Pääruoka</option>
            <option value="">Jälkiruoka</option>
        </select></div>
        <div className='addText'>Annoksen nimi: 
        <input className='addBox' required="required"
          type="text"
          value={name}
          placeholder="Annoksen nimi"
          onChange={(e) => setName(e.target.value)}
        /></div>
        <div className='addText'>Annoksen kuvaus: 
        <input className='addBox' required="required"
          type="text"
          value={description}
          placeholder="Kuvaus"
          onChange={(e) => setDescription(e.target.value)}
        /></div>
               
        <div className='addText'>Annoksen Hinta: 
        <input className='addBox' required="required"
          type="text"
          value={price}
          placeholder="Hinta"
          onChange={(e) => setPrice(e.target.value)}
        /></div>
        <div className='addText'>URL annoksen kuvaan: 
        <input className='addBox' 
          type="text"
          value={menuItemImg}
          placeholder="URL annoksen kuvaan"
          onChange={(e) => setMenuItemImg(e.target.value)}
        /></div>        
        
        <div className='createBox'>

        <button  className='createBox'type="submit">Luo annos</button>
        </div>
        <div className="message">{message ? <p>Annos lisätty</p> : null}</div>
        
      </form>
      <div>
      {menus.map(menu => 
                  
                  <div key ={restaurantId.idRestaurant} className='addMenu'><img src={menu.menuItemImg} className='addMenuItemImg'/>{menu.name }  <div>Annoksen kuvaus: {menu.description}, Hinta: {menu.price}€  
                  </div></div>
                  )
                  }
      </div>
    </div>
  );
}
export default AddMenu;
