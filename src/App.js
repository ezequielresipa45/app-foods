import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import Nav from "./Components/Nav/Nav";
import Login from "./Components/Login/Login";
import Foods from "./Components/Foods/Foods";
import FoodDetail from "./Components/FoodDetail/FoodDetail";
import Favorites from "./Components/Favorites/Favorites";
import { connect } from "react-redux";
import Form from "./Components/Form/Form";



function App({ access }) {
  console.log(access)
 if (access) {
    return (
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/forms" element={<Form />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/detail/:id" element={<FoodDetail />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    access: state.access,
  };
};

export default connect(mapStateToProps)(App);
