import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getFoods } from "../../redux/actions";
import FoodCard from "../FoodCard/FoodCard";
import style  from './Foods.module.css'

function Foods({ foods, getFoods }) {
  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div>

      <div className={style.contenedor_foods}>
      <h2>Tipos de Comidas </h2>
        {foods.map((food, id) => (
          <FoodCard key={id} category={food.strCategory} id={food.idCategory} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    foods: state.foods,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFoods: () => {
      dispatch(getFoods());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
