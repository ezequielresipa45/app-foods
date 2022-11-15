import React from 'react'
import { Link } from "react-router-dom";

export default function FoodCard(props) {
  return (
    <Link to={`/detail/${props.id}`}>
    <div>
        <p>
            {props.category}

        </p>
    </div>
    </Link>
  )
}



