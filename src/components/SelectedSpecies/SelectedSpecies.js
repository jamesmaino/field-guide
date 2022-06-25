import React from 'react';
import styles from './SelectedSpecies.module.css'
const SelectedSpecies = ({ showSelected, setShowSelected }) => {
    console.log(showSelected)
    const image = showSelected.taxon?.default_photo?.medium_url || '' 
    const att = showSelected.taxon?.default_photo?.attribution
    const taxonId = showSelected.taxon?.id
    const openTaxaDetails = ()=>{
        const taxonLink = `https://www.inaturalist.org/taxa/${taxonId}`
        window.open(taxonLink, '_blank')
    }

    return (
        <div className={styles.absolutebg} onClick={() => { setShowSelected('') }} >
            <div className={styles.panel} onClick={(e) => { e.stopPropagation() }}>
                {/* <button className={styles.button17} >{"<"}</button> */}
                <div className={styles.imagecontainer}>
                    <img alt={att} className={styles.image} src={image} onClick={openTaxaDetails}/>
                    <div className={styles.attribution}>{att}</div>
                </div>
                {/* <button className={styles.button17}>{">"}</button> */}
            </div>
        </div>
    );
};

export default SelectedSpecies;