import classes from "./Card.module.css"
import React from "react";

function Card({ setShowSelected, speciesInfo }) {
  const {count, introduced, taxon} = speciesInfo
  const {preferred_common_name, name} = taxon
  const image = taxon?.default_photo?.medium_url || '' 
  return (
    <div className={classes.card} onClick={() => setShowSelected(speciesInfo)}>
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

export default Card;