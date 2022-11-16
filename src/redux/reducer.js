const initialState = {

    foods: [],
    favorites: [],
    username : 'ezequielresipa45@gmail.com',
    password : 'Eze1995!',
    access: false,

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
        favorites: [...state.favorites.filter(f => f.idCategory !== action.payload)]
      }  



      case 'SET_ACCESS':
        return{
          ...state,
          access: true
        }



    default:
      return {
        ...state,
      };
  }
};

export default reducer;