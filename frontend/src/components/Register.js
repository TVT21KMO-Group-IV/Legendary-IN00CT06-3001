import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
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