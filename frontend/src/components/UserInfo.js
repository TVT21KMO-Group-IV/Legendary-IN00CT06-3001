// import React, { useState, useEffect } from 'react'
// import jwt_decode from "jwt-decode";

// export default function UserInfo(props) {
    
//   const { userJwt } = props
//   var decoded = jwt_decode(userJwt);
//   const [userInfo, setUserInfo] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [restaurant, setRestaurant] = useState([]);

//   useEffect(async () => {
//     const user = await fetch(`http://localhost:5000/userinfo/${decoded.idUser}`).then((res) =>
//       res.json()
//     )

//     console.log(user)
//     setUserInfo(user)
//   }, []);
//   useEffect(async () => {
//     const restaurant = await fetch('http://localhost:5000/restaurant').then((res) =>
//       res.json()
//     )
//     console.log(restaurant)
//     setRestaurant(restaurant)
//   }, []);
//   useEffect(async () => {
//     const orders = await fetch(`http://localhost:5000/orders/${decoded.idUser}`).then((res) =>
//       res.json()
//     )
//     console.log(orders)
//     setHistory(orders)
//   }, []);
//   return (
//     <div>Olet kirjautuneena käyttäjänä: 
//         {userInfo.map((userInfo) => (
//         <div>
//             <div key={userInfo.idUser} className='restaurantHome'>
//               <div className='restaurantHomeText' >{userInfo.fname } {userInfo.lname}
//                 </div></div></div>
                
//           )) }<p>Tilaushistoriani</p>
//           <div>{restaurant.map((restaurant) )}
//               {
//                   history.map((history) => (
//                       <div>
//                           <div key={history.idUser}>Tilausaika: {history.orderTime } Summa: {history.price} 
//                           Toimitusosoite: {history.address} 
//                          </div>  </div> 
//                   ))
//               }
//           </div>
//     </div>
//   )
// }
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";

export default function UserInfo(props) {
    
  const { userJwt } = props
  var decoded = jwt_decode(userJwt);
  const [userInfo, setUserInfo] = useState([]);
  const [history, setHistory] = useState([]);
  const [restaurant, setRestaurant] = useState([]);

  useEffect(async () => {
    const user = await fetch(`http://localhost:5000/userinfo/${decoded.idUser}`).then((res) =>
      res.json()
    )

    console.log(user)
    setUserInfo(user)
  }, []);
  useEffect(async () => {
    const restaurant = await fetch('http://localhost:5000/restaurant').then((res) =>
      res.json()
    )
    console.log(restaurant)
    setRestaurant(restaurant)
  }, []);
  useEffect(async () => {
    const orders = await fetch(`http://localhost:5000/orders/${decoded.idUser}`).then((res) =>
      res.json()
    )
    console.log(orders)
    setHistory(orders)
  }, []);
  return (
    <div>Olet kirjautuneena käyttäjänä: 
        {userInfo.map((userInfo) => (
        <div>
            <div key={userInfo.idUser} className='restaurantHome'>
              <div className='restaurantHomeText' >{userInfo.fname } {userInfo.lname}
                </div></div></div>
                
          )) }<p>Tilaushistoriani</p>
          <div>
              {
                  history.map((history) => (
                      <div>
                          <div key={history.idUser}>RavintolaId: {history.restaurant} Tilausaika: {history.orderTime } Summa: {history.price}  Toimitusosoite: {history.address}
                         </div>  </div> 
                  ))
              }
          </div>
    </div>
  )
}