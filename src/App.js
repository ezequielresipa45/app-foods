import './App.css';
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import Login from './Components/Login/Login';
import Foods from './Components/Foods/Foods';
import FoodDetail from './Components/FoodDetail/FoodDetail';
import Favorites from './Components/Favorites/Favorites';


export default function App() {



      // FUNCION QUE SE LA PASO A UN BOTON EN EL NAV, QUE VA A DESLOGEAR AL USUARIO  
      // const logout = () => access && setAccess(false) 



  return (
<>

    <Nav />

    <Routes>


        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login /> } />
        <Route path="/foods" element={<Foods />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/detail/:id" element={<FoodDetail/>} />

    </Routes>

  </>
  )

}



