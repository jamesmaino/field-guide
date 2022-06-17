import React from 'react';
import styles from './SelectedSpecies.module.css'
const SelectedSpecies = ({ showSelected, setShowSelected }) => {
    return (
        <div className={styles.panel} onClick={() => setShowSelected('')} >
            <div>
                <img className={styles.image} src={showSelected}></img>
            </div>
        </div>
    );
};

export default SelectedSpecies;