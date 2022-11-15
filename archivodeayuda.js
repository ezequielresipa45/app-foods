import './App.css';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getFoods } from './redux/actions'

function App(props) {

  
  
  
  useEffect(()=>{props.getFoods()},[])
    
    

  return (
    <div className="App">

    HOOOOLAAA

{props.foods.map((food,id)=>


<div key={id}>

<h2>{food.strCategory}</h2>




</div>
)}
     

    </div>
  );
}


const mapStateToProps = (state) => {

  return{
    foods : state.foods
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getFoods : ()=>{dispatch(getFoods())},
  
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)