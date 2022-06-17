import classes from "./ExpandCard.module.css" 
import React from "react";

function ExpandCard({show, handleShowMoreClick }) {
  return (
    <div className={classes.card} onClick={handleShowMoreClick}>
      <img className={classes.image} src={show ? './img/seeless.png' : './img/seemore.png'} alt="Copyright Placeholder"></img>
      <div><b>{show ? 'See less' : 'See more'}</b></div>
    </div>
  );
}

export default ExpandCard;