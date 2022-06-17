import "./NavBar.css"
import React, { Link, useState } from "react";

const NavBar = ({ title }) => {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    return (
        <nav className="navigation">
            <img alt="field-guide-icon" src="./img/numbat_medium_orange.png"></img>
            <a href="/" className="brand-name">{title}</a>
            <button className="hamburger" onClick={() => {
                setIsNavExpanded(!isNavExpanded);
            }}>
                {/* icon from heroicons.com */}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
                <ul>
                    <li>
                        <a href="/home">Home</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar


{/* <div className={classes.navbar}>
<header>
    <div className={classes.title}>
       
    </div>
    <nav>
        <ul>
            <li><a href='./' >About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>
</header>
</div> */}