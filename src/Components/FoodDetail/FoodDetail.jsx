import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { add_food, delete_food } from '../../redux/actions'


function FoodDetail(props) {








      const { id } = useParams();

      const [character, setCharacter] = useState();


      const [isFav, setIsFav] = useState(false);

      const handleFavorite = ()=>{
      
// console.log(character[0].idCategory)

      if(isFav){
        setIsFav(false);
        props.delete_food(character.idCategory)
      }else{
        setIsFav(true);
        props.add_food(character)
       
      }
    }

 


  useEffect(()=>{
    // console.log(props.foods)
    let filtrado = props.foods.filter(food => food.idCategory === id);


  setCharacter(filtrado[0])


  
  
},[])



useEffect(()=>{
  
  props.favorites.forEach((fav) => {

    if(character && fav ){

   if (fav.idCategory === character.idCategory) {
       setIsFav(true);
    }
    }
  });
})






  // console.log(character)
  // console.log(character[0])
  // console.log(props.favorites)



 if(!character){

return (
    <h2>Cargando...</h2>
)

 }else{



    return (
        <div>
              {
      isFav ? (<button onClick = {handleFavorite}>❤️</button>) : (
        <button onClick = {handleFavorite}>🤍</button>
      )
    }
          <Link to='/foods'><p>Volver</p></Link>
          <p>{character.strCategory}</p>
            <p>{character.strCategoryDescription}</p>
        </div>
      );


 }


}

const mapStateToProps = (state) => {
  return {
    foods: state.foods,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    add_food: (food)=>{
      dispatch(add_food(food))
    },

    delete_food:(id)=>{
      dispatch(delete_food(id))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FoodDetail);
