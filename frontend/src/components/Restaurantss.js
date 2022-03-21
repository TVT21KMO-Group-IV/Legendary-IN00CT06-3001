import React from 'react'

export default function Restaurantss (props) {
  return (
    <div className="">
    <div><h1>{ props.name }</h1></div>    
    <div>{props.type }</div>
    <div>{ props.pricerange }</div>
    <div>{ props.address }</div>
    <div>{ props.openingHours }</div>
    
    </div>);   
}