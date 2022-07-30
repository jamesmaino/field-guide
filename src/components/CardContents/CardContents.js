import classes from "./CardContents.module.css"
import React, { useState } from "react";
import SelectedSpecies from '../SelectedSpecies/SelectedSpecies'

function CardContents({ speciesInfo }) {
  const [showSelected, setShowSelected] = useState({})

  console.log('Rendering card')
  const { count, introduced, taxon } = speciesInfo
  const { preferred_common_name, name } = taxon
  // const license = taxon?.default_photo?.license_code
  let imgUrl = taxon?.default_photo?.square_url
  const [img, setImg] = useState(imgUrl || '')

  // console.log('Swapping photo for CC')
  let imageElement = new Image();
  imageElement.src = img.replace('sqaure', 'medium');
  imageElement.onload = () => setImg(img.replace('square', 'medium'))

  // // swapLoResImage(imgUrl)

  // moving this to when data loads for first time
  // if (license === null) {
  //   fetch(`https://api.inaturalist.org/v1/observations?photos=true&licensed=true&photo_licensed=true&license=cc-by%2Ccc-by-nc%2Ccc-by-nd%2Ccc-by-sa%2Ccc-by-nc-nd%2Ccc-by-nc-sa%2Ccc0&photo_license=cc-by%2Ccc-by-nc%2Ccc-by-nd%2Ccc-by-sa%2Ccc-by-nc-nd%2Ccc-by-nc-sa%2Ccc0&taxon_id=${taxon.id}&quality_grade=research&page=1&per_page=1&order=desc&order_by=votes`,
  //     {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' }
  //     })
  //     .then(res => res.json())
  //     .then(speciesInfo => {
  //       imgUrl = speciesInfo.results[0].photos[0].url.replace('square', 'medium')
  //       setImg(imgUrl)
  //       // swapLoResImage(imgUrl)
  //     })
  // }
  // console.log(speciesInfo)
  return (
    <>
      {showSelected.taxon ?   <SelectedSpecies setShowSelected={setShowSelected} showSelected={showSelected} /> : null}
      <div className={classes.container} onClick={() => setShowSelected(speciesInfo)}>
        {introduced && <div className={classes.introduced}>introduced</div>}
        <img className={classes.image} src={img} alt="" />
        <div className={classes.info}>
          <div className={classes.count}>
            <img className={classes.eye} src='./img/eye.png' alt="" />
            {count}
          </div>
          <div className={classes.capitalize}><b>{preferred_common_name}</b></div>
          <div><i>{name}</i></div>
        </div>
      </div>
    </>
  );
}

export default CardContents;