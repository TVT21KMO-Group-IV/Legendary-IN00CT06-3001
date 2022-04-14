import React, { useState, useContext  } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Constants from './Constants.json';
import {UserAuthContext} from './Contexts'


export default function Login(props) {
  
   const [ username, setUsername ] = useState('');
     const [ password, setPassword ] = useState('');  
   const UserAuthContextValue = useContext(UserAuthContext);
    let navigate = useNavigate();
  const token = null
    const [ loginProcessState, setLoginProcessState ] = useState("idle");

    const onSubmit = async (event) => {
      event.preventDefault();
      setLoginProcessState("processing");
      try {
        const result = await fetch(`http://localhost:5000/login` , {
               method: 'POST',
               headers: {"Content-Type": "application/json",
         },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
        console.log(result);
        console.log(result.data);
        setLoginProcessState("success");
        setTimeout(() => {
          setLoginProcessState("idle")
          UserAuthContextValue.login(result.data.token);
          navigate("/", { replace: true });
        }, 1500);
      } catch (error) {
        console.error(error.message);
        setLoginProcessState("error");
        setTimeout(() => setLoginProcessState("idle"), 1500);
      }
    }
  
    let loginUIControls = null;
    switch(loginProcessState) {
      case "idle":
        loginUIControls = <button type="submit">Login</button>
        break;
  
      case "processing":
        loginUIControls = <span style={{color: 'blue'}}>Processing login...</span>
        break;
  
      case "success":
        loginUIControls = <span style={{color: 'green'}}>Login successful</span>
        break;
  
      case "error":
        loginUIControls = <span style={{color: 'red'}}>Error</span>
        break;
  
      default:
        loginUIControls = <button type="submit">Login</button>
    }
  
  
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={ onSubmit }>
        <div><input type="text" value={username} placeholder='Käyttäjätunnus' className='loginInsertBox' onChange={(e) => setUsername(e.target.value)}>
             </input></div>
           <div><input type="password" value={password} placeholder='Salasana' className='loginInsertBox' onChange={(e) => setPassword(e.target.value)}>
             </input></div>
          <div>
            { loginUIControls }
          </div>
        </form>
      </div>
    )
  }
//   const [ username, setUsername ] = useState('');
//     const [ password, setPassword ] = useState('');  
//     const [ message, setMessage] = useState();  // to store success or error message

// const addSubmit = async (e) => {
//     e.preventDefault();
//  try {        
//  const result = await axios.post(Constants.API_ADDRESS + '/loginForJWT', null, {
    //auth: {
//       username: event.target.username.value,
//       password: event.target.password.value
      
//     },
// }).then((res)=>{
// //res.json());
//     UserAuthContextValue.login(result.data.token);
//            navigate("/", { replace: true });
// }
// )
// } catch(err){
// console.log(err);
// }
// };   
//   return (
//     <div className="contentWrapper">
//         <p>
//         Kirjaudu sisään antamalla käyttäjätunnus ja salasana
//         </p>
//         <form onSubmit={ addSubmit }>
//           <div><input type="text" value={username} placeholder='Käyttäjätunnus' className='loginInsertBox' onChange={(e) => setUsername(e.target.value)}>
//             </input></div>
//           <div><input type="password" value={password} placeholder='Salasana' className='loginInsertBox' onChange={(e) => setPassword(e.target.value)}>
//             </input></div>
//           <button className='loginButton' type="submit" >Kirjaudu sisään</button>

//           <div className="message">{message ? <p>Kirjauduttu sisään</p> : null}</div>
//           </form>
//     </div>
//   )
// }


