import styles from "./About.module.css"
const About = ({ location }) => {

  return (
    <>
      <div className={styles.container}>

        <div className={styles.heading}> About </div>
        This is a simple field guide describing the wildlife of {location.title}.
        <br /><br />

        Species are grouped into popular categories and then sorted observation frequency by default. However, toggling the options at the top of the home page allows you sort by species relatedness and seasonality. 


        <div className={styles.heading}> iNaturalist </div>
        The species records and images have been made available by <a href='https://www.inaturalist.org/'>iNaturalist</a> and its users. Images have been attributed to the content creators.

        To edit or add more observations and species to the list, visit <a href='https://www.inaturalist.org/'>iNaturalist</a>. New species identifications, which have been verified by at least one other user and are licensed as Creative Commons, will be automatically included into the webpage.

        <br /><br />


      </div>
    </>
  )
}

export default About