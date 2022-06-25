import styles from "./About.module.css"
const About = () => {

  return (
    <>
      <div className={styles.container}>

        <div className={styles.heading}> About </div>
        This webpage is a simple field guide that describes the rich wildlife that exists in the Grampians Gariwerd National Park. The species are organised by broad taxonomic groups and then sorted in descending order of commonness.
        <br /><br />


        Clicking on an image will enlargen it. Clicking the image again will open a tab with more information on the species, such as their distribution and seasonality. The slider bar at the top of the page restricts the species by the months in which they have been recorded by iNaturalist users.
        <br /><br />


        <div className={styles.heading}> iNaturalist </div>
        The content on this page is generated through the use of the <a href='https://www.inaturalist.org/'>iNaturalist</a> API. To edit or add more observations and species to the list, visit <a href='https://www.inaturalist.org/'>iNaturalist</a>. New species identifications, which have been verified by at least one other user, will be automatically included into the webpage.

        <br /><br />
        Images are not my own and have been attributed to the content creators.


      </div>
    </>
  )
}

export default About