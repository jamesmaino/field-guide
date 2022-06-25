import classes from "./CardHolder.module.css"
import React from "react";
import species from "../../data.json";
import ExpandCard from "../ExpandCard/ExpandCard";
import Card from "../Card/Card"

// console.log(species)

const CardHolder = ({title, taxonName, month, showMore, setShowMore, setShowSelected }) => {
    let show = showMore[taxonName]
    let limit = show ? 1000 : 5

    const handleShowMoreClick = (key) => {
        // console.log(showMore)
        setShowMore({ ...showMore, [key]: !showMore[key] })
      }

    return (
        <div className={classes.cardholder}>
            <div className={classes.holdertitle}>{title}</div>
            <div className={classes.cards}>
                {!show ? null : <ExpandCard show={show} handleShowMoreClick={() => handleShowMoreClick(taxonName)} />}
        {species
          .filter(x => x.taxon.iconic_taxon_name === taxonName)
          .filter(x => x.month === month)
          .sort((a, b) => { return b.count - a.count })
          .filter((x, i) => i < limit)
          .map((speciesInfo, i) => {
            return (
              <Card
                setShowSelected={setShowSelected}
                key={speciesInfo.taxon.name}
                speciesInfo={speciesInfo}
              />
            )
          })
        }
        {show ? null : <ExpandCard show={show} handleShowMoreClick={() => handleShowMoreClick(taxonName)} />}
            </div>
            {/* <button className={classes.button1} onClick={handleShowMoreButton}>{showMoreTaxa ? "See less" : "See all"}</button> */}
        </div>
    )
}

export default CardHolder