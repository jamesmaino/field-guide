import classes from "./CardHolder.module.css"
import React from "react";

const CardHolder = ({ children, title }) => {
    return (
        <div className={classes.cardholder}>
            <div className={classes.holdertitle}>{title}</div>
            <div className={classes.cards}>
                {children}
            </div>
            {/* <button className={classes.button1} onClick={handleShowMoreButton}>{showMoreTaxa ? "See less" : "See all"}</button> */}
        </div>
    )
}

export default CardHolder