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
import classes from "./App.module.css"

import iconicTaxa from './iconictaxa.json'


// To do 
// CardHolder needs to be refactored for data loading efficiency

// resources
// https://github.com/jumear/stirfry

let title = "Wildlife Field Guide"

function App() {
  useEffect(() => {
    document.title = title
  }, []);

  let iconic_taxon_names = iconicTaxa  
    .map(x=>x.taxa)
    .reduce((o, x) => { return { ...o, [x]: false } }, {})

  const [showMore, setShowMore] = useState(iconic_taxon_names);
  const [month, setMonth] = useState(0)
  const [showSelected, setShowSelected] = useState('')
  const [route, setRoute] = useState('home')
  const [sortMethod, setSortMethod] = useState('common')
  const [location, setLocation] = useState('grampians')

  const setShowSelected2 = (x) => {
    console.log(x)
    setShowSelected(x)
  }

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
              month={month}
              setShowSelected={setShowSelected2}
              location={location}
              setLocation={setLocation} />
          )
        })}
      </div>
    )
  }, [showMore, location, month, sortMethod]
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
            <About />
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
      <NavBar title={title} setRoute={setRoute} />
      {month !== 0 && <CustomizedSlider setMonth={setMonth} />}
      {routePage(route)}

    </div>
  );
}

export default App;
