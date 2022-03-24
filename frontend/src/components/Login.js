import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='alignCenter'>
        <p>
        Loggaapas ittes sissään
        </p>
        <div className='padding'>
        <input type="text" placeholder='käyttäjätunnus' className='loginInsertBox'></input>
        </div>
        <div>
        <input type="text" placeholder='salasana' className='loginInsertBox'></input></div>
        <div className='marginTop'>       
        <button className='loginInsertBox'>Kirjaudu sisään</button>
        </div>
        <div className='padding5'><Link to="RegisterView" ><button className='loginInsertBox'>Luo uusi käyttäjä</button></Link>
        </div>
    </div>
  )
}


