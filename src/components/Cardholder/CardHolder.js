import classes from "./CardHolder.module.css"
import React, { memo } from "react";
import ExpandCard from "../ExpandCard/ExpandCard";
import CardContents from "../CardContents/CardContents"
import Card from "../Card/Card";

// console.log(species)

const CardHolder = ({ title, taxonName, sortMethod, month, showMore, setShowMore, speciesData }) => {

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
    if (sortMethod === 'common') return sortByCommon(a, b)
    if (sortMethod === 'related') return sortByRelated(a, b)
  }

  const species = speciesData

  let taxaShowMore = !showMore[taxonName]
  let taxaShowLess = showMore[taxonName]

  const nSpecies = species
    .filter(x => x.taxon.iconic_taxon_name === taxonName)
    .filter(x => x.month === month)
    .length

  let holderTitle = ''
  if (title==='Plants' && nSpecies === 0 ) {
    holderTitle = <img src='/img/loading.gif' alt="Loading species..." />
  } 
  if (nSpecies > 0) {
    holderTitle = title
  }

  if (nSpecies < 6) {
    taxaShowMore = false
    taxaShowLess = false
  }

  const CardList = memo(() => {
    return (
      <>
        {
          species
            .filter(x => x.taxon.iconic_taxon_name === taxonName)
            .filter(x => x.month === month)
            .sort(sortFunction)
            .filter((x, i) => i < limit)
            .map((speciesInfo, i) => {
              return (
                <Card key={speciesInfo.taxon.name}>
                  <CardContents
                    key={speciesInfo.taxon.name}
                    speciesInfo={speciesInfo}
                  />
                </Card>
              )
            })
        }
      </>
    )
  })

  return (
    <div className={classes.cardholder}>
      <div className={classes.holdertitle}>{holderTitle}</div>
      <div className={classes.cards}>
        {taxaShowLess && <ExpandCard show={show} handleShowMoreClick={() => handleShowMoreClick(taxonName)} />}
        <CardList />
        {taxaShowMore && <ExpandCard show={show} handleShowMoreClick={() => handleShowMoreClick(taxonName)} />}
      </div>
    </div>
  )
}

export default CardHolder