import NavBar from "./components/NavBar/NavBar";
import CardHolder from "./components/Cardholder/CardHolder";
import Footer from './components/Footer/Footer'
import React, { useEffect, useState } from 'react';
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Options from './components/Options/Options';
import Map from "./components/Map/Map"
import classes from "./App.module.css"

import getiNatData from "./getiNatData"

import iconicTaxa from './iconictaxa.json'
// import speciesGrampians from "./data-grampians";
// import locations from "./locations.json";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";


// To do 
// get locations from git
//

// inat resources
// https://github.com/jumear/stirfry


function App() {
 
  let iconic_taxon_names = iconicTaxa
    .map(x => x.taxa)
    .reduce((o, x) => { return { ...o, [x]: false } }, {})

  const [showMore, setShowMore] = useState(iconic_taxon_names);
  const [month, setMonth] = useState(0)
  const [sortMethod, setSortMethod] = useState('common')
  const [locations, setLocations] = useState([])
  const [location, setLocation] = useState({})
  const [speciesData, setSpeciesData] = useState([])

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/jamesmaino/field-guide/main/src/locations.json")
    .then(res => res.json())
    .then(data => {
       setLocations(data)
    }) 
  },[])

  const HomePage = () => {
    const locParams = useParams()
    if (locations.length > 0 && locParams.loc !== location.slug) {
      console.log('Setting new location')
      const newLoc = locations.filter(l => l.slug === locParams.loc)
      setLocation(newLoc[0])
      document.title = newLoc[0]?.title
      getiNatData(setSpeciesData, newLoc[0].bbox)
    }
    const speciesList = iconicTaxa.map(x => {
      return (
        <CardHolder
          key={x.taxa}
          title={x.title}
          taxonName={x.taxa}
          sortMethod={sortMethod}
          month={month}
          showMore={showMore}
          setShowMore={setShowMore}
          speciesData={speciesData} />
      )
    })

    return (
      <>
        {/* <Scroll> */}
        <Options
          month={month}
          setMonth={setMonth}
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
          // locations={locations}
          location={location}
          setLocation={setLocation} />
        {speciesList}
        <Footer />
        {/* </Scroll> */}
      </>
    )
  }

  const AboutPage = () => {
    return (
      <>
        <Map bbox={location.bbox} />
        <About location={location} />
        <Footer />
      </>
    )
  }

  const ContactPage = () => {
    return (
      <>
        <Contact />
        <Footer />
      </>
    )
  }

  return (
    <div className={classes.App}>

      <BrowserRouter>
        <NavBar month={month} location={location} setMonth={setMonth} title={location.title + " Field Guide"} />
        <Routes>
          <Route path=':loc' element={<HomePage />} />
          <Route path=':loc/about' element={<AboutPage />} />
          <Route path=':loc/contact' element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
