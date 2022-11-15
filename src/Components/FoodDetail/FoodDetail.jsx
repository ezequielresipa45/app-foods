import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

function FoodDetail(props) {


      const { id } = useParams();
      const [character, setCharacter] = useState([]);

//   console.log(id)
// console.log(props.foods.filter(food => food.idCategory === id))

  useEffect(()=>{
    // console.log(props.foods)
  setCharacter(props.foods.filter(food => food.idCategory === id))
  
  },[])


 if(character.length === 0){

return (
    <h2>Cargando...</h2>
)

 }else{



    return (
        <div>
          Holiis
          <p>{character[0].strCategory}</p>
            <p>{character[0].strCategoryDescription}</p>
        </div>
      );


 }


}

const mapStateToProps = (state) => {
  return {
    foods: state.foods,
  };
};

export default connect(mapStateToProps, null)(FoodDetail);
