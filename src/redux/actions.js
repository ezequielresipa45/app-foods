export const getFoods = () => {
  return function (dispatch) {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: "GET_FOODS", payload: data.categories })
      );
  };
};

export const add_food = (food) => {
  return {
    type: "ADD_FOOD",
    payload: food,
  };
};

export const delete_food = (id) => {
  return { 
    type: "DELETE_FOOD", 
    payload: id 
  };
};
