import classes from "./CardHolder.module.css"
import React from "react";
import speciesGrampians from "../../data-grampians";
import speciesWashoe from "../../data-washoe.json";
import ExpandCard from "../ExpandCard/ExpandCard";
import Card from "../Card/Card"


// console.log(species)

const CardHolder = ({ title, taxonName, sortMethod, month, showMore, setShowMore, setShowSelected, location, setLocation }) => {
  let show = showMore[taxonName]
  let limit = show ? 1000 : 5

  const handleShowMoreClick = (key) => {
    // console.log(showMore)
    setShowMore({ ...showMore, [key]: !showMore[key] })
  }

  const sortByRelated = (a, b) => {
    const x = a.taxon.ancestor_ids
    const y = b.taxon.ancestor_ids
    for (let i = 0; i < x.length; i++) {
      if (x[i] !== y[i]) {
        return x[i] - y[i]
      }
    }
  }

  const sortByCommon = (a, b) => { return b.count - a.count }

  const sortFunction = (a, b) => {
    if (sortMethod === 'common' ) return sortByCommon(a, b)
    if (sortMethod === 'related') return sortByRelated(a, b)
  }

  const species = (location === 'washoe' ? speciesWashoe : speciesGrampians) 
  .filter(x => x.taxon.iconic_taxon_name === taxonName)
  .filter(x => x.month === month)
  .sort(sortFunction)
  
  let taxaShowMore = !showMore[taxonName]
  let taxaShowLess = showMore[taxonName]

  if (species.length < 6){
    taxaShowMore = false
    taxaShowLess = false
  }

  return (
    <div className={classes.cardholder}>
      <div className={classes.holdertitle}>{title}</div>
      <div className={classes.cards}>
        {taxaShowLess && <ExpandCard show={show} handleShowMoreClick={() => handleShowMoreClick(taxonName)} />}
        {species
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
        {taxaShowMore && <ExpandCard show={show} handleShowMoreClick={() => handleShowMoreClick(taxonName)} />}
      </div>
      {/* <button className={classes.button1} onClick={handleShowMoreButton}>{showMoreTaxa ? "See less" : "See all"}</button> */}
    </div>
  )
}

export default CardHolder