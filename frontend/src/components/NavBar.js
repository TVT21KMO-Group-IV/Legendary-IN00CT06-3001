import React from 'react'
import { Link } from 'react-router-dom'
import siteLogo from './food4u_logo_001_vaalea_100px.png';

export default function NavBar() {
  return (
    <div className='barBackground'>
        <div className='barElements'>
            <Link to ="/"><img src={siteLogo} width="293" height="100" alt="Food 4 U"/></Link>
                <div className='barButtons'>
                    <Link className="button"to ="/Login" title="Kirjaudu"><i class="fas fa-sign-in-alt" /></Link>
                    <Link className="button" to ="/Register" title="Luo itsellesi tunnus"><i class="fas fa-user-plus" /></Link>
                    <Link className="button" to ="/ShoppingCart" title="Ostoskärry"><i class="fas fa-cart-arrow-down" /></Link>
                </div>
         </div>   
    </div>
  )
}