import React, { useEffect, useState } from 'react';
import styles from './SelectedSpecies.module.css'
const SelectedSpecies = ({ showSelected, setShowSelected }) => {
    // console.log(showSelected)
    const def_att = showSelected.taxon?.default_photo?.attribution
    const def_img = showSelected.taxon?.default_photo?.medium_url
    const taxonId = showSelected.taxon?.id
    const openTaxaDetails = () => {
        const taxonLink = `https://www.inaturalist.org/taxa/${taxonId}`
        window.open(taxonLink, '_blank')
    }

    const license = showSelected.taxon.default_photo.license_code;

    let nImages = 10
    const [images, setImages] = useState([])
    const [imgCounter, setImgCounter] = useState(0)
    const [image, setImage] = useState({ url: license === null ? './img/loading.gif' : def_img, att: def_att })
    const photosUrl = `https://api.inaturalist.org/v1/observations?photos=true&licensed=true&photo_licensed=true&license=cc-by%2Ccc-by-nc%2Ccc-by-nd%2Ccc-by-sa%2Ccc-by-nc-nd%2Ccc-by-nc-sa%2Ccc0&photo_license=cc-by%2Ccc-by-nc%2Ccc-by-nd%2Ccc-by-sa%2Ccc-by-nc-nd%2Ccc-by-nc-sa%2Ccc0&taxon_id=${taxonId}&quality_grade=research&page=1&per_page=${nImages}&order=desc&order_by=votes`
    
    useEffect(
        () => {
            if((license === null && images.length === 0) || ( imgCounter !== 0 && images.length === 0 )){ // initial state
                setImage((im)=>({ ...im, url: '/img/loading.gif' }))
                console.log('FETCHING IMAGES')
                fetch(photosUrl)
                    .then(res => res.json())
                    .then(speciesInfo => {
                        let photos = speciesInfo.results.map(results =>
                        ({
                            url: results.photos[0].url.replace('square', 'medium'),
                            att: results.photos[0].attribution
                        })
                        )
                        if (license !== null) {
                            photos = [
                                {
                                    url: showSelected.taxon?.default_photo?.medium_url,
                                    att: showSelected.taxon?.default_photo?.attribution
                                },
                                ...photos
                            ]
                            setImage(photos[1])
                        } else {
                            setImage(photos[0])
                        }
    
                console.log('IMAGES FETCHED')
                        setImages(photos)
                        // preload images for quick transition
                        for (const image of photos) {
                            const imageElement = new Image();
                            imageElement.src = image.url;
                        }
                    })
                    return ()=>{console.log('clean up (placeholder)')}
            }

            },

        [imgCounter, images, license, photosUrl, showSelected]
    )


    // eslint-disable-next-line
    function incrementImgCounter(increment) {
        console.log('incrementing counter')
        const i = imgCounter + increment
        setImage({ ...image, url: './img/loading.gif' })
        setImage(images[i])
        setImgCounter(i)
    }
    useEffect(() => {
        const keyLog = (e) => {
            if(e.key ==="ArrowLeft" && imgCounter !== 0 && nImages>0) incrementImgCounter(-1)
            if(e.key ==="ArrowRight" && imgCounter !== nImages-1 && nImages>0) incrementImgCounter(1)
            if(e.key ==="Escape") setShowSelected('')
        }
        window.addEventListener('keydown', keyLog)
        return () => window.removeEventListener('keydown', keyLog)
    },[nImages, images, imgCounter, incrementImgCounter, setShowSelected])
    
    const att = image?.att
    const url = image?.url
    return (
        <div className={styles.absolutebg} onClick={() => { setShowSelected('') }} >
            <div className={styles.panel} >
                <div className={styles.close}>Close</div>
                <div className={styles.imagecontainer} onClick={(e) => { e.stopPropagation() }}>
                    <img alt={att} className={styles.image} src={url} onClick={openTaxaDetails} />
                    <div className={styles.attribution}>
                        {image?.att}
                        <div className={styles.imgNav}>
                            {imgCounter !== 0 && <button className={styles.button} onClick={() => incrementImgCounter(-1)}>&laquo; Prev</button>}
                            {imgCounter !== nImages-1 && <button className={styles.button} onClick={() => incrementImgCounter(1)}>Next &raquo;</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedSpecies;