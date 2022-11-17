import React from 'react'
import { Link } from "react-router-dom";
import style  from './FoodCard.module.css'


export default function FoodCard(props) {
  return (
    <Link to={`/detail/${props.id}`}>
    <div className={style.container_foodsCard}>
      
            {props.category}

      
    </div>
    </Link>
  )
}



