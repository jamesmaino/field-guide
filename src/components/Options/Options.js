import styles from "./Options.module.css"

const Options = ({ month, setMonth, sortMethod, setSortMethod, location, setLocation }) => {
    const toggleSeasonal = () => {
        const d = new Date()
        month === 0 ? setMonth(d.getMonth() + 1) : setMonth(0)
    }
    const toggleSort = () => {
        setSortMethod(sortMethod === 'related' ? 'common' : 'related')
    }
    const toggleLocation = () => {
        setLocation(location === 'grampians' ? 'washoe' : 'grampians')
    }

    const Option = ({isChecked, toggle, label}) => {
        return (
            <div className={styles.option}>
                <div className={styles.optionLabel}>{label}</div>
                <label className={styles.switch}>
                    <input checked={isChecked} onChange={toggle} type="checkbox" />
                    <span className={styles.slider}></span>
                </label>
            </div>
        )
    }

    return (
        <div>
            <div className={styles.optionsContainer}>
                <Option label="Filter by month" isChecked={month!==0} toggle={toggleSeasonal}/>
                <Option label="Sort by relatedness" isChecked={sortMethod==='related'} toggle={toggleSort}/>
                <Option label="Set location to Washoe" isChecked={location==='washoe'} toggle={toggleLocation}/>
            </div>
        </div>
    )
}

export default Options
