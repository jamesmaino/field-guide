import classes from "./ExpandCard.module.css"
import React from "react";
import Card from "../Card/Card";

function ExpandCard({ show, handleShowMoreClick }) {
  return (
    <Card>
      <div className={classes.container} onClick={handleShowMoreClick}>
        <img className={classes.image} src={show ? './img/seeless.png' : './img/seemore.png'} alt="Copyright Placeholder"></img>
        <div><b>{show ? 'See less' : 'See more'}</b></div>
      </div>
    </Card>
  );
}

export default ExpandCard;