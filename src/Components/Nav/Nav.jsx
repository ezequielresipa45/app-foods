import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { set_access } from "../../redux/actions";
import style  from './Nav.module.css'

function Nav({ set_access }) {
  const location = useLocation();

  const handleLogout = () => {
    set_access(false);
  };

  if (location.pathname === "/") {
    return (
      <div className={style.container_nav} >
        <h2>APP - FOODS 🥘 </h2>

        <Link to="/login">
          Login 🤵
        </Link>
      </div>
    );
  } else if (location.pathname === "/login") {
    return (
      <div className={style.container_nav}>
        <h2>APP - FOODS 🥘</h2>

        <Link to="/">
          Home 🏠
        </Link>
      </div>
    );
  } else {
    return (
      <div className={style.container_nav}>
        <h2>APP - FOODS 🥘</h2>

        <Link to="/favorites">
          Favoritos ⭐
        </Link>
        <Link to="/foods">
          Foods 🥘
        </Link>
        <Link to="/">
          Home 🏠
        </Link>
        <button onClick={handleLogout}>LogOut 👋 </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    set_access: (valor) => {
      dispatch(set_access(valor));
    },
  };
};

export default connect(null, mapDispatchToProps)(Nav);
