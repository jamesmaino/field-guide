import classes from "./SpeciesCard.module.css"
import React from "react";

function SpeciesCard({ setShowSelected, name, introduced, preferred_common_name, count, image }) {
  return (
    <div className={classes.card} onClick={()=>setShowSelected(image)}>
      <img className={classes.image} src={image} alt="Copyright Placeholder" />
      <div className={classes.count}>
        <img className={classes.eye} src='./img/eye.png' alt="" />
        {count}
      </div>
      <div><b>{preferred_common_name}</b></div>
      <div><i>{name}</i></div>
      <div className={classes.introduced}>{introduced ? 'introduced' : null}</div>
    </div>
  );
}

export default SpeciesCard;