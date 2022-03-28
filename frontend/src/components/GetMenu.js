import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


export default function Menus (props) {

    const [menus, setMenus] =useState([]);
    const {idmenu} = useParams();
    //let { idRestaurant } = useParams();
    
      useEffect(async(idRestaurant) => {
        const oneMenu = await fetch(`http://localhost:5000/menuitem/${idRestaurant}`).then((res)=>
        res.json()
        )
        
        console.log(oneMenu)
        setMenus( oneMenu )
      },[]);
    
      return (
          <div>testitesti
              {menus.map(menu => 
                  
              <div key ={idmenu.idRestaurant}>{menu.name}
              <button>testinappi</button></div>
              )
              }
          </div>
      )
      }

// function Menu() {
//     const [menus, setMenus] = useState({name:{}});
//     const {idRestaurant}=useParams();
//     const fetchM = () => {
//         fetch(`http://localhost:5000/menuitem/${idRestaurant}`)
//         .then(res=>res.json())
//         .then(data=>setMenus(data))
//     };
//     useEffect(()=>{
//         fetchM();
//     },[]);
//     return (
//         <div>
//             {menus.map(menu =><div key={menu.idRestaurant}>{menu.name}
//         </div>)}
//            </div>
//     )
// }
// export default Menu;


//  const SelectedMenu = () => {
//     const [oneMenu, setOneMenu] = useState([]);
//     useEffect(() => {
//         fetchMenu();
//     }, []);

//     const fetchMenu = () => {
//         axios
//         .get('http://localhost:5000/menuitem/:idRestaurant')
//         .then((res) => {
//             setOneMenu(res.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     };
//     return ( <div>
//         <h1>Ravintolan menu</h1>
//         <div className=''>
//             {oneMenu.map((menuitem) => (
//                 <div className='' key={menuitem.idRestaurant}>
//                     <p>{menuitem.name} {menuitem.price}</p>
//                     <Link to={`/menuitem/${menuitem.idRestaurant}`}>click</Link>
//                     </div>
//             ))}
//             </div>
//             </div>
//     )
// }
// export default SelectedMenu;