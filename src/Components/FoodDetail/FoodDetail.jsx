import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { add_food, delete_food } from '../../redux/actions'

function FoodDetail(props) {


      const { id } = useParams();
      const [character, setCharacter] = useState([]);


      const [isFav, setIsFav] = useState(false);

      const handleFavorite = ()=>{
      
      if(isFav){
        setIsFav(false);
        props.delete_food(character.id)
      }else{
        setIsFav(true);
        props.add_food(character)
      }
    }

 


  useEffect(()=>{
    // console.log(props.foods)
  setCharacter(props.foods.filter(food => food.idCategory === id))

  props.favorites.forEach((fav) => {


        
    if (fav.idCategory === character[0].idCategory) {
       setIsFav(true);
    }
 });

  
  },[props.favorites])



  console.log(props.favorites)

 if(character.length === 0){

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
          
          <p>{character[0].strCategory}</p>
            <p>{character[0].strCategoryDescription}</p>
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
