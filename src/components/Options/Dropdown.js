import "./Dropdown.css"

const Dropdown = ({location, setLocation }) => {

    return (
        <div className="dropdown">
            <button className="dropbtn">{location.toUpperCase()}</button>
            <div className="dropdown-content">
                <div onClick={()=>setLocation("washoe")}>Washoe Valley</div>
                <div onClick={()=>setLocation("grampians")}>Grampians/Gariwerd</div>
                <div onClick={()=>setLocation("lubeck")}>Lubeck</div>
            </div>
        </div>
    )
}

export default Dropdown