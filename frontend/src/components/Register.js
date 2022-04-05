import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';

function Register() {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ fname, setFname ] = useState('');
    const [ lname, setLname ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ idOwner, setIdOwner] = useState('');  
    const [ message, setMessage] = useState('');  // to store success or error message

let addSubmit = async (e) => {
    e.preventDefault();
 try {        
    let res = await fetch(`http://localhost:5000/user` , {
    method: 'POST',
    headers: {"Content-Type": "application/json",
  },
    body: JSON.stringify( {
        
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
            <form onSubmit={ addSubmit}>
                <div><input type="text"  value = { username} placeholder='Käyttäjätunnus' className='loginInsertBox' onChange = {(e) => setUsername(e.target.value)}></input></div>
                <div><input type="password"  value = { password }placeholder='Salasana' className='loginInsertBox' onChange = {(e) => setPassword(e.target.value)}></input></div>
                <div><input type="text" value ={ fname } placeholder='Etunimi' className='loginInsertBox' onChange = {(e) => setFname(e.target.value)}></input></div>
                <div><input type="text" value ={ lname } placeholder='Sukunimi' className='loginInsertBox' onChange = {(e) => setLname(e.target.value)}></input></div>
                <div><input type="text"  value ={ address } placeholder='Osoite' className='loginInsertBox' onChange = {(e) => setAddress(e.target.value)}></input></div>
                <div><input type="text"  value = { idOwner }placeholder='Omistaja' className='loginInsertBox' onChange = {(e) => setIdOwner(e.target.value)}></input></div> 

                <div><button className='loginButton'type='submit'>Luo käyttäjä</button></div>
                <div className="message">{message ? <p>Käyttäjä lisätty</p> : null}</div>
            </form>
    </div>
  )
}
export default Register;