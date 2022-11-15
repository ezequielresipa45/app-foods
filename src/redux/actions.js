
export const getFoods = () => {
    return function (dispatch) {
      fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) =>response.json())
      .then((data) => dispatch({type: 'GET_FOODS', payload: data.categories})) 
    };
  };