import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";


import './navStyle.css';

const NavBar = () => {



    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    return (
        <>

            <nav>
                <a className="homeButton" href="/">HOME</a>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                </div>
                <div className={menu_class}>
                <ul className="links">
                    <li><a href="/about">ABOUT</a></li>
                    <li><a href="/projects">PROJECTS</a></li>
                    <li><a href="/capabilities">CAPABILITIES</a></li>
                </ul>

            </div>
            </nav>

        </>
    )

}

export default NavBar
