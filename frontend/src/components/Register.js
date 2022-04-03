import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../App.css';

function Register() {

    const [ idUser, setIdUser ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ fname, setFname ] = useState('');
    const [ lname, setLname ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ idOwner, setIdOwner] = useState();  
    const [ message, setMessage] = useState();  // to store success or error message

let addSubmit = async (e) => {
    e.preventDefault();
 try {        
    let res = await fetch(`http://localhost:5000/user` , {
    method: 'POST',
    headers: {"Content-Type": "application/json",
  },
    body: JSON.stringify( {
        idUser: idUser,
        username: username,
        password: password,
        fname: fname,
        lname: lname,
        address: address,
        idOwner: idOwner,
    }),
}).then((res)=>
res.json());

    if (res.status === 200) {
        setIdUser('');
        setUsername('');
        setPassword('');
        setFname('');
        setLname('');
        setAddress('');
        setIdOwner('');
        setMessage('Käyttäjä lisätty!');
    } else {
        setMessage("Error occured");
    }
} catch(err){
    console.log(err);

    }
};


  return (
    <div className='alignCenter'>
        <p>
        Reggaappas ittes sissään
        </p>
            <div><input type="text" placeholder='Etunimi' className='loginInsertBox'></input></div>
            <div><input type="text" placeholder='Sukunimi' className='loginInsertBox'></input></div>
            <div><input type="text" placeholder='Osoite' className='loginInsertBox'></input></div>
            <div><input type="text" placeholder='Puh.num' className='loginInsertBox'></input></div>
            <div><input type="text" placeholder='Käyttäjätunnus' className='loginInsertBox'></input></div>
            <div><input type="text" placeholder='Salasana' className='loginInsertBox'></input></div> 
            <button className='loginButton'>Luo käyttäjä</button>
        
       
    </div>
  )
}
export default Register;