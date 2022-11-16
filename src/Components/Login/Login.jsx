import React , { useEffect, useState } from "react";
import { set_access } from "../../redux/actions";
import { connect } from "react-redux";
import {   useNavigate } from "react-router-dom";


function Login({username,password,access}) {



  const navigate = useNavigate();

  function login(userData) {
    if (username === userData.username && password === userData.password) {
      set_access();
      navigate("/foods");
    } else {
      alert("Usuario o contraseña invalida");
    }
  }


  const [userData, setUserData] = useState({
    username:'',
    password:''
  })


      const handleInputChange = (e) => {

        setUserData({...userData, [e.target.name] : e.target.value})
        
      
        }


        const handleSubmit = (e)=>{
          e.preventDefault();
            login(userData)
           
          }  


  return (
    <div>
      
      <h2> Soy El LOGIIIN</h2>
      
     
      <input type="text" placeholder='Usuario' value = {userData.username} onChange={handleInputChange} name='username'/>
      <input type="password" placeholder='Contraseña' value = {userData.password} onChange={handleInputChange} name='password' />
      <button onClick={handleSubmit}>Ingresar</button>




    </div>
  )
}




const mapStateToProps = (state) => {
  return {
    username: state.username,
    password: state.password,
    access: state.access,
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    set_access: () => {
      dispatch(set_access());
    },
  };
};




export default connect(mapStateToProps,mapDispatchToProps)(Login);