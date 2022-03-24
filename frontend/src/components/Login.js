import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div>
        <p>
        Loggaapas ittes sissään
        </p>
        <div className='padding'>
        <input type="text" placeholder='käyttäjätunnus'></input>
        </div>
        <div className='padding'>
        <input type="text" placeholder='salasana'></input>
        <button className='padding'>Kirjaudu sisään</button>
        </div>
        <Link to="RegisterView" className='padding'><button>Luo uusi käyttäjä</button></Link>
    </div>
  )
}
