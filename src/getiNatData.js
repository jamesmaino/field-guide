const getiNatData = (setData, bbox) => {
    
    const { nelng, nelat, swlng, swlat } = bbox
    
    let baseurl = `https://api.inaturalist.org/v1/observations/species_counts?nelat=${nelat}&nelng=${nelng}}&swlat=${swlat}&swlng=${swlng}&quality_grade=research`
    
    // api requests
    let introduced = [true, false]
    let months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let urls = []
    let querystring = ''
    for (let i of introduced) {
        for (let m of months) {
            if (m === 0){
                querystring = `&introduced=${i}`
            } else {
                querystring = `&introduced=${i}&month=${m}`
            }
            urls.push({
                url: baseurl + querystring,
                month: m,
                introduced: i
            })
        }
    }
    console.log("set up iNat API promise")
    Promise.all(
        urls.map(o =>
            fetch(o.url, {mode:'cors'})
                .then(res => res.json())
                .then(data => {
                    return (
                        data.results.map(
                            x => ({
                                ...x,
                                introduced: o.introduced,
                                month: o.month
                            })
                        )
                    )
                })
                .catch(e => console.log(e))
        )
    ).then(data => {
        console.log(data)
        const out = data.reduce((o,x)=>([...o, ...x]),[])
        setData(out); 
        console.log("returning inat promise")
    })
}

export default getiNatData