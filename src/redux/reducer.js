const initialState = {

    foods: [],
    favorites: [],

};

// El encargado de enviarle al state nuestros pedidos o cambios que querramos hacer.
const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'GET_FOODS':
        return{
            ...state,
            foods: action.payload
        }

    case 'ADD_FOOD':
      return{
        ...state,
        favorites: [...state.favorites, action.payload]
      }
      
      
    case 'DELETE_FOOD':
      return{
        ...state,
        favorites: [state.favorites.filter(f => f.id !== action.payload)]
      }  


    default:
      return {
        ...state,
      };
  }
};

export default reducer;