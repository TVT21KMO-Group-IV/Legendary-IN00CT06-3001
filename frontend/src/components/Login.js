import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div>
        <p>
        Loggaapas ittes sissään
        </p>
        <Link to="RegisterView"><button>Luo uusi käyttäjä</button></Link>
    </div>
  )
}
