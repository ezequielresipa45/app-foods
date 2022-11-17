import React from "react";
import { connect } from "react-redux";
import style  from './Favorites.module.css'


function Favorites(props) {
//   console.log(props.favorites);

  if (props.favorites.length !== 0) {
    return (
      <div className={style.container_favorites}>
        <h2>MIS FAVORITOS ⭐</h2>



      <div className={style.contenedor_variasFoods}>

        {props.favorites.map((fav, key) => {
          return (
            <div key={key} className = {style.container_food}>

              <h2>{fav.strCategory}</h2>
              <img src={fav.strCategoryThumb} alt={fav.strCategory} />



            </div>
         
          
          


          
          );
        })}

      </div>








      </div>
    );
  } else {
    return <h2>No hay nada en favoritos....</h2>;
  }
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps)(Favorites);
