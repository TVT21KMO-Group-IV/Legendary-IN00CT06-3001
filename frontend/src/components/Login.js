import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='alignCenter'>
        <p>
        Loggaapas ittes sissään
        </p>
          <div><input type="text" placeholder='Käyttäjätunnus' className='loginInsertBox'></input></div>
          <div><input type="text" placeholder='Salasana' className='loginInsertBox'></input></div>
          <button className='loginButton'>Kirjaudu sisään</button>
    </div>
  )
}


