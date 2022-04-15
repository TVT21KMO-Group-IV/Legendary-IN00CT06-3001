import './App.css';
import Login from './components/Login';
import RegisterView from './components/RegisterView';
import React from 'react';
import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import RestaurantView from './components/RestaurantView';
// View to view all restaurants
import Restaurantss from './components/Restaurantss';
// View for a single restaurant
import Restaurant from './components/Restaurant';
import Search from './components/Search';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Menu from './components/Menu';
import Footer from './components/Footer';
import GetMenu from './components/GetMenu';
import AddRestaurant from './components/AddRestaurant';
import AddMenu from './components/AddMenu'

const jwtFromStorage = window.localStorage.getItem('appAuthData');

function App (props)  {

  const [ userJwt, setUserJwt ] = useState(jwtFromStorage);
  let authRoutes = <>
  <Route path="/login" element = { <Login login={(token) => {
                    window.localStorage.setItem('appAuthData', token);
                    setUserJwt(token);
                  }} /> } />                 
  </>
  
  if(userJwt != null) {
    authRoutes = <Route path="/addrestaurant" element={ <AddRestaurant userJwt={ userJwt } logout={() => setUserJwt(null)} /> }/>
    
  }
  console.log(userJwt)

  return (<div className='pageWrapper'>
     
     <div>Auth status: { userJwt != null ? "Logged in": "Not logged in" } </div>
    <BrowserRouter>

      <NavBar />
        <Routes>
          <Route path="/Login" element={<Login setUserJwt={ setUserJwt } />} />
          <Route path="/Register" element={ <Register userJwt={ userJwt } />} />
          <Route path="/" element={ <Restaurantss/> } />
          <Route path="/restaurant/:restaurantId" element={ <GetMenu /> } />
          <Route path="/addRestaurant" element={ <AddRestaurant userJwt={ userJwt } /> } />
          <Route path="/AddMenu/:restaurantId" element={ <AddMenu userJwt={ userJwt } /> } />
        </Routes>
      <Footer />
          
    </BrowserRouter>
    
    </div>
  );
}

export default App;
