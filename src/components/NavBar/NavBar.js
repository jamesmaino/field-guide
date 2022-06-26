import "./NavBar.css"
import React, { useState } from "react";

const NavBar = ({ title, setRoute, month, setMonth }) => {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
  
    return (
        <div>

            <nav className="navigation">
                <img alt="field-guide-icon" src="./img/numbat_medium_orange.png"></img>
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
                        <li onClick={() => setRoute('home')}>
                            Home
                        </li>
                        <li onClick={() => setRoute('about')}>
                            About
                        </li>
                        <li onClick={() => setRoute('contact')}>
                            Contact
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
