import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='barBackground'>
        <div className='barElements'>
            <Link to ="/"><h1 className='logo'>Food4U</h1></Link>
                <div className='barButtons'>
                    <Link to ="/Login"><button className='kirjBut'>Kirjaudu</button></Link>
                    <Link to ="/Register"><button className='rekBut'>Rekisteröidy</button></Link>
                </div>
         </div>   
    </div>
  )
}