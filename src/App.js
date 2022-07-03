import CustomizedSlider from './components/CustomizedSlider/CustomizedSlider';
import NavBar from "./components/NavBar/NavBar";
import Scroll from "./components/Scroll/Scroll";
import CardHolder from "./components/Cardholder/CardHolder";
import Footer from './components/Footer/Footer'
import SelectedSpecies from './components/SelectedSpecies/SelectedSpecies';
import React, { useState, useEffect, useMemo } from 'react';
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Options from './components/Options/Options';
import Map from "./components/Map/Map"
import classes from "./App.module.css"

import getiNatData from "./getiNatData"

import iconicTaxa from './iconictaxa.json'
import speciesGrampians from "./data-grampians";
import locations from "./locations.json";


// To do 
// CardHolder needs to be refactored for data loading efficiency
// map location


// resources
// https://github.com/jumear/stirfry


function App() {
  
  let iconic_taxon_names = iconicTaxa  
  .map(x=>x.taxa)
  .reduce((o, x) => { return { ...o, [x]: false } }, {})
  
  const [showMore, setShowMore] = useState(iconic_taxon_names);
  const [month, setMonth] = useState(0)
  const [showSelected, setShowSelected] = useState('')
  const [route, setRoute] = useState('home')
  const [sortMethod, setSortMethod] = useState('common')
  const [location, setLocation] = useState(locations[0])
  const [speciesData, setSpeciesData] = useState(speciesGrampians)
  
  useEffect(() => {
    console.log('location', location)
    document.title = location?.title
  }, [location]);
  
  const setShowSelected2 = (x) => {
    console.log(x)
    setShowSelected(x)
  }

  useEffect(
    ()=>getiNatData(setSpeciesData, location.bbox)
  ,[location])

  const speciesList = useMemo(() =>{
    return(
      <div>
        {iconicTaxa.map(x => {
          return (
            <CardHolder
              key={x.taxa}
              sortMethod={sortMethod}
              title={x.title}
              taxonName={x.taxa}
              showMore={showMore}
              setShowMore={setShowMore}
              speciesData={speciesData}
              setSpeciesData={setSpeciesData}
              month={month}
              setShowSelected={setShowSelected2}
              location={location}
              setLocation={setLocation} />
          )
        })}
      </div>
    )
  }, [showMore, speciesData, location, month, sortMethod]
  )

  const routePage = (route) => {
    switch (route) {
      case "home":
        return (
          <>
            {showSelected ? <SelectedSpecies setShowSelected={setShowSelected} showSelected={showSelected} /> : null}
            <Scroll>
              <Options
                month={month}
                setMonth={setMonth}
                sortMethod={sortMethod}
                setSortMethod={setSortMethod}
                locations={locations}
                location={location}
                setLocation={setLocation} />
              {speciesList}
              <Footer />
            </Scroll>
          </>
        )
      case "about":
        return (
          <>
            <Map bbox={location.bbox}/>
            <About location={location}/>
            <Footer />
          </>
        )
      case "contact":
        return (
          <>
            <Contact />
            <Footer />
          </>
        )
      default:
        return null
    }

  }

  return (
    <div className={classes.App}>
      <NavBar title={location.title + " Field Guide"} setRoute={setRoute} />
      {month !== 0 && <CustomizedSlider setMonth={setMonth} />}
      {routePage(route)}

    </div>
  );
}

export default App;
