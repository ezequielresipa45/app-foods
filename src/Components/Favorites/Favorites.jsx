import React from "react";
import { connect } from "react-redux";

function Favorites(props) {
//   console.log(props.favorites);

  if (props.favorites.length !== 0) {
    return (
      <div>
        <h2>MIS FAVORITOS</h2>

        {props.favorites.map((fav, key) => {
          return <p key={key}>{fav.strCategory}</p>;
        })}
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
