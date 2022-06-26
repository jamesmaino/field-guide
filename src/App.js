import CustomizedSlider from './components/CustomizedSlider/CustomizedSlider';
import NavBar from "./components/NavBar/NavBar";
import Scroll from "./components/Scroll/Scroll";
import CardHolder from "./components/Cardholder/CardHolder";
import Footer from './components/Footer/Footer'
import SelectedSpecies from './components/SelectedSpecies/SelectedSpecies';
import React, { useState, useEffect } from 'react';
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Options from './components/Options/Options';
import classes from "./App.module.css"

import iconicTaxa from './iconictaxa.json'


// To do 
// remove redundant iconic names
// make empty card when no obs for given month

// resources
// https://github.com/jumear/stirfry

let title = "Wildlife Field Guide"

function App() {
  useEffect(() => {
    document.title = title
  }, []);

  let iconic_taxon_names = [
    'Plantae', 'Animalia', 'Mollusca', 'Reptilia', 'Aves', 'Amphibia', 'Actinopterygii',
    'Mammalia', 'Insecta', 'Arachnida', 'Fungi', 'Protozoa', 'Chromista', 'unknown']
    .reduce((o, x) => { return { ...o, [x]: false } }, {})

  const [showMore, setShowMore] = useState(iconic_taxon_names);
  const d = new Date();
  const [month, setMonth] = useState(d.getMonth() + 1)
  const [showSelected, setShowSelected] = useState('')
  const [route, setRoute] = useState('home')
  const [sortMethod, setSortMethod] = useState('common')
  const [location, setLocation] = useState('grampians')

  const setShowSelected2 = (x) => {
    console.log(x)
    setShowSelected(x)
  }

  const speciesList = (
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
