import React from 'react'
import { Link, useLocation } from "react-router-dom";




export default function Nav({logout}) {

  const location = useLocation();



  if(location.pathname === '/'){


    return (
      <div>
        
        
        <h2>Soy el Nav</h2>
  

        <Link to='/login'><p>Login</p></Link>
  
  
      </div>
    )









  }else if(location.pathname === '/login'){


    return (
      <div>
        
        
        <h2>Soy el Nav</h2>
  
        <Link to='/'><p>Home</p></Link>
  
  
      </div>
    )



  }
  
  
  
  
  
  else{



    return (
      <div>
        
        
        <h2>Soy el Nav</h2>
  
        <Link to='/favorites'><p>Favoritos</p></Link>
        <Link to='/foods'><p>Foods</p></Link>
        <Link to='/'><p>Home</p></Link>
<button onClick={logout}>LogOut </button>  
  
      </div>
    )




















  }




}
