import classes from "./Card.module.css"
import React, {useState} from "react";

function Card({ setShowSelected, speciesInfo }) {
  // console.log(speciesInfo)
  const {count, introduced, taxon} = speciesInfo
  const {preferred_common_name, name} = taxon
  const license = taxon.default_photo.license_code
   
  const [img, setImg] = useState(taxon?.default_photo?.medium_url || '')
  if(license === null) {
    fetch(`https://api.inaturalist.org/v1/observations?photos=true&licensed=true&photo_licensed=true&license=cc-by%2Ccc-by-nc%2Ccc-by-nd%2Ccc-by-sa%2Ccc-by-nc-nd%2Ccc-by-nc-sa%2Ccc0&photo_license=cc-by%2Ccc-by-nc%2Ccc-by-nd%2Ccc-by-sa%2Ccc-by-nc-nd%2Ccc-by-nc-sa%2Ccc0&taxon_id=${taxon.id}&quality_grade=research&page=1&per_page=1&order=desc&order_by=votes`)
    .then(res => res.json())
    .then(speciesInfo => setImg(speciesInfo.results[0].photos[0].url.replace('square', 'medium')))
  }

  return (
    <div className={classes.card} onClick={() => setShowSelected(speciesInfo)}>
      {introduced && <div className={classes.introduced}>introduced</div>}
      <img className={classes.image} src={img} alt="Copyright Placeholder" />
      <div className={classes.count}>
        <img className={classes.eye} src='./img/eye.png' alt="" />
        {count}
      </div>
      <div className={classes.capitalize}><b>{preferred_common_name}</b></div>
      <div><i>{name}</i></div>
    </div>
  );
}

export default Card;