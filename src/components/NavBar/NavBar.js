import "./NavBar.css"
import React, { useState } from "react";
import CustomizedSlider from "../CustomizedSlider/CustomizedSlider";
import { Link } from 'react-router-dom'
const NavBar = ({ title, month, setMonth, location }) => {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    return (
        <nav className={month === 0 ? "navigation short" : "navigation"}>
            <img alt="field-guide-icon" src="/img/numbat_medium_orange.png"></img>
            <a href="/" className="brand-name">{title}</a>
            <button className="hamburger" onClick={() => {
                setIsNavExpanded(!isNavExpanded);
            }}>
                {/* icon from heroicons.com */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
                <ul>
                    <li><Link to={'/'+location.slug}>Home</Link></li>
                    <li><Link to={location.slug+'/about'}>About</Link></li>
                    <li><Link to={location.slug+'/contact'}>Contact</Link></li>
                </ul>
            </div>
            {month !== 0 && <CustomizedSlider setMonth={setMonth} />}
        </nav>
    )
}

export default NavBar
