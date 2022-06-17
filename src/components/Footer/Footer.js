import React from "react";
import style from "./Footer.module.css"
const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.text}>
                © 2022 Copyright:
                <a className={style.link} href="https://www.jamesmaino.com/">
                     jamesmaino.com</a>
            </div>
        </footer>
    )
}

export default Footer
