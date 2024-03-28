import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect, useRef } from "react";


import './navStyle.css';

import gsap from 'gsap';
import {Power4} from 'gsap'
import { ClipPath } from '@react-pdf/renderer';


const NavBar = () => {

    const tl = gsap.timeline()
    const leftPanel = useRef(null);
    const rightPanel = useRef(null);

    useEffect(() => {

      tl.to(leftPanel.current, {
        duration: 7,
        x: '0vw',
        y:-500,
        ease: 'power1.inOut',
      }, 0);

      tl.to(rightPanel.current, {
        duration: 7,
        x: '0vw',
        y:500,
        ease: 'power1.inOut',
      }, 0);
    }, []);




    // tl.to(container, {clipPath:'polygon(0 0, 48% 53%, 100% 100%, 0% 100%)'})
    // tl.to(container, {clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'}, '+=1')

    // useEffect(()=> {
    //     container.addEventListener('mouseover', () =>{
    //         tl.play()
    //     })
    // })





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
                <div className="split-page-container">


                <ul className="links">
                    <li className="abt"><a href="/about">ABOUT</a></li>
                    <li><a href="/projects">PROJECTS</a></li>
                    <li><a href="/capabilities">CAPABILITIES</a></li>
                </ul>
                <div className="left-panel" ref={leftPanel}></div>
                <div className="right-panel" ref={rightPanel}></div>

            </div>
            </div>
            </nav>



        </>
    )

}

export default NavBar
