const initialState = {

    foods: [],

};

// El encargado de enviarle al state nuestros pedidos o cambios que querramos hacer.
const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'GET_FOODS':
        return{
            ...state,
            foods: action.payload
        }


    default:
      return {
        ...state,
      };
  }
};

export default reducer;