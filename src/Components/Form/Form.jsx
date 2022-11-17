import React, { useState } from "react";
import { validationUrl, validationTextArea } from './validations'
import { connect } from "react-redux";
import styles from './Form.module.css'
import {add_food_new_manual} from '../../redux/actions'
import { useNavigate } from "react-router-dom";

// console.log(validationUrl('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'))


// console.log(validationTextArea('Hods'))

function Form({ foods, add_food_new_manual, newFoods  }) {

    let navigate = useNavigate();

  const [userDate, setUserDate] = useState({
    idCategory: Math.floor(Math.random() * 9999).toString(),
    strCategory: "",
    strCategoryThumb: "",
    strCategoryDescription: ""
  });


console.log(newFoods)


  const [errors, setErrors] = useState({
    strCategory: "",
    strCategoryThumb: "",
    strCategoryDescription: ""

  });






  function validate(inputs) {
    let errors = {};
  
    if (validateFoods(inputs.strCategory)) {
      errors.strCategory = "Comida existente, intente con otra";

    }else if (!validationUrl(inputs.strCategoryThumb)){
        errors.strCategoryThumb = "La URL no es válida, intente con una URL con .png - .jgp"
    }else if (!validationTextArea(inputs.strCategoryDescription)){
        errors.strCategoryDescription = "Tu descripción debe tener un máximo de 100 caracteres y un mínimo de 5"
    }
    
  
    return errors;
  }


  const handleInputChange = (e) => {
    setUserDate({ ...userDate, [e.target.name]: e.target.value });
    setErrors(validate({ ...userDate, [e.target.name]: e.target.value }));
    // console.log(errors)
  };

  const validateFoods = (value) => {
    for (let i = 0; i < foods.length; i++) {
      if (foods[i].strCategory === value) {
        return true;
      }
    }
    return false;
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add_food_new_manual(userDate);
    
    alert('Has añadido correctamente una nueva comida');
    navigate('/foods')

    // validateFoods(userDate.strCategory);
    // Aqui va que HARÁ CUANDO LE DEMOS CLICK A ENVIAR FORMULARIO O LOGIN...
  };

  return (
    <div className={styles.containerForm}>
        <h2>ADD FOOD</h2>
      <form onSubmit={handleSubmit} className={styles.forms}>
        <input
          type="text"
          placeholder="Name Food"
          name="strCategory"
          value={userDate.strCategory}
          onChange={handleInputChange}
        />
 {errors.strCategory && <p>{errors.strCategory}</p>}



<input type="url" name="strCategoryThumb" placeholder="Add Url Image" value={userDate.strCategoryThumb} onChange={handleInputChange}   />
{errors.strCategoryThumb && <p>{errors.strCategoryThumb}</p>}

<textarea type="text"  name="strCategoryDescription"  placeholder="Describe to food" value={userDate.strCategoryDescription} onChange={handleInputChange} > </textarea>
{errors.strCategoryDescription && <p>{errors.strCategoryDescription}</p>}


        
{Object.entries(errors).length === 0 &&  <button type="submit">Add Food</button>}

      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    foods: state.foods,
    newFoods : state.newFoods
  };
};


const mapDispatchToProps = (dispatch) => {
    return{
        add_food_new_manual: (food)=>{
        dispatch(add_food_new_manual(food))
      },
    }
  }



export default connect(mapStateToProps, mapDispatchToProps)(Form);
