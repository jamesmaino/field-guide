import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Slider from '@mui/material/Slider';
import CustomizedSlider from './components/CustomizedSlider/CustomizedSlider';
import NavBar from "./components/NavBar/NavBar";
import Scroll from "./components/Scroll/Scroll";
import CardHolder from "./components/Cardholder/CardHolder";
import SpeciesCard from "./components/SpeciesCard/SpeciesCard";
import ExpandCard from "./components/ExpandCard/ExpandCard";
import Footer from './components/Footer/Footer'
import SelectedSpecies from './components/Cardholder/SelectedSpecies/SelectedSpecies';
import React, { useState, useEffect } from 'react';
import species from "./data.json";

import classes from "./App.module.css"

// To do 
// add photo credit
// finish navigation
// add links to inat
// add map

// resources
// https://github.com/jumear/stirfry

let title = "Grampian's Wildlife Field Guide"

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



  const makeSpeciesCardList = (taxonName, title) => {
    let show = showMore[taxonName]
    let limit = show ? 1000 : 5
    return (
      <CardHolder title={title}>
        {!show ? null : <ExpandCard show={show} handleShowMoreClick={() => handleShowMoreClick(taxonName)} />}
        {species
          .filter(x => x.taxon.iconic_taxon_name === taxonName)
          .filter(x => x.month === month)
          .sort((a, b) => { return b.count - a.count })
          .filter((x, i) => i < limit)
          .map((x, i) => {
            return (
              <SpeciesCard
                setShowSelected={setShowSelected}
                key={x.taxon.name}
                count={x.count}
                introduced={x.introduced}
                preferred_common_name={x.taxon.preferred_common_name}
                name={x.taxon.name}
                image={x.taxon?.default_photo?.medium_url || ''}
              />
            )
          })
        }
        {show ? null : <ExpandCard show={show} handleShowMoreClick={() => handleShowMoreClick(taxonName)} />}
      </CardHolder>
    )
  }

  const handleShowMoreClick = (key) => {
    console.log(showMore)
    setShowMore({ ...showMore, [key]: !showMore[key] })
  }

  const changeMonth = (event, value) => {
    console.log(value)
    setMonth(value);
  };

  return (
    <div className={classes.App}>
      <NavBar title={title} />
      <CustomizedSlider changeMonth={changeMonth} />
      <Scroll>
        {showSelected ? <SelectedSpecies setShowSelected={setShowSelected}  showSelected={showSelected}/> : null}
        {makeSpeciesCardList("Plantae", "Plants")}
        {makeSpeciesCardList("Mammalia", "Mammals")}
        {makeSpeciesCardList("Aves", "Birds")}
        {makeSpeciesCardList("Insecta", "Insects")}
        {makeSpeciesCardList("Reptilia", "Reptiles")}
        {makeSpeciesCardList("Amphibia", "Frogs")}
        {makeSpeciesCardList("Arachnida", "Arachnids")}
        {makeSpeciesCardList("Fungi", "Fungi")}
        <Footer />
      </Scroll>
    </div>
  );
}

export default App;
