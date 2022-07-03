import "./Dropdown.css"

const Dropdown = ({locations, location, setLocation }) => {
    const DropDownItem = ({loc, title}) => {
        return(
            <div onClick={()=>setLocation(loc)}>{title}</div>
        )
    }
    return (
        <div className="dropdown">
            <button className="dropbtn">{location.slug.toUpperCase()}</button>
            <div className="dropdown-content">
              {locations.map(loc => <DropDownItem key={loc.slug} loc={loc} title={loc.title}/>)}
            </div>
        </div>
    )
}

export default Dropdown