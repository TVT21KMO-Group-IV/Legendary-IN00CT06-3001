import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function Login() {

  const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');  
    const [ message, setMessage] = useState();  // to store success or error message

let addSubmit = async (e) => {
    e.preventDefault();
 try {        
    let res = await fetch(`http://localhost:5000/login` , {
    method: 'POST',
    headers: {"Content-Type": "application/json",
  },
    body: JSON.stringify( {
      username: username,
      password: password,
        
    }),
}).then((res)=>
res.json());

if (res.status === 200) {
  setUsername('');
  setPassword('');
  
  setMessage('Kirjauduttu!');
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
        Kirjaudu sisään antamalla käyttäjätunnus ja salasana
        </p>
        <form onSubmit={ addSubmit }>
          <div><input type="text" value={username} placeholder='Käyttäjätunnus' className='loginInsertBox' onChange={(e) => setUsername(e.target.value)}>
            </input></div>
          <div><input type="password" value={password} placeholder='Salasana' className='loginInsertBox' onChange={(e) => setPassword(e.target.value)}>
            </input></div>
          <button className='loginButton' type="submit" >Kirjaudu sisään</button>

          <div className="message">{message ? <p>Kirjauduttu sisään</p> : null}</div>
          </form>
    </div>
  )
}


