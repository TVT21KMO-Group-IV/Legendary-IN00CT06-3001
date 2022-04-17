import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";

export default function UserInfo(props) {
    
  const { userJwt } = props
  var decoded = jwt_decode(userJwt);
  const [userInfo, setUserInfo] = useState([]);


  useEffect(async () => {
    const user = await fetch(`http://localhost:5000/userinfo/${decoded.idUser}`).then((res) =>
      res.json()
    )

    console.log(user)
    setUserInfo(user)
  }, []);

  return (
    <div>Olet kirjautuneena käyttäjällä: 
        {userInfo.map((userInfo) => (
        <div>
            <div key={userInfo.idUser} className='restaurantHome'>
              <div className='restaurantHomeText' >{userInfo.fname } {userInfo.lname}
                </div></div></div>
                
          )) }<button>Näytä tilaushistoriani</button>
    </div>
  )
}
