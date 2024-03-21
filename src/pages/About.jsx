import React from 'react';
import AboutScene from '../scenes/AboutScene.jsx';
import '../scenes/About.css'
import { useState } from 'react';
import  { useEffect } from 'react';

import TagCloud from "TagCloud";
import TextSphere from '../components/TagCloud.jsx';

const About = () => {

    const[currentSection, setCurrentSection] = useState('section hidden');
    const[movement, setMovement]= useState(window.scrollY)
    const[isScrolled, setIsScrolled]= useState(false)

    const updateSection =() => {
        if(!isScrolled) {
            setIsScrolled(true)
            setMovement(window.addEventListener('scroll', window.scrollY))
            setCurrentSection('section visible')
        } else {
            setCurrentSection('section hidden')
            setIsScrolled(false)
        }
        setIsScrolled(!isScrolled)
    }

//     const TextSphere = ()=> {
//         useEffect(()=> {
//             return()=> {
//         const container = '.tagcloud'
//         const skills = [':::: JavaScript ::::', ':::: React - React Native ::::', ':::: Responsive Web Design ::::',':::: Version Control/Git ::::',':::: Professional Graphic Design Skills ::::',':::: Problem-Solving Skills ::::',':::: HTML/CSS ::::',':::: THREEJS ::::',':::: WebPack/Vite ::::',':::: Pyton ::::',':::: SQL ::::',':::: Revit ::::',':::: Cinema 4D ::::',':::: Maya ::::',':::: Photoshop CC ::::',':::: AutoCAD ::::',':::: Rhinoceros ::::',':::: Figma ::::']
//         const options = {
//             radius: 400,
//             maxSpeed: "normal",
//             initSpeed: "normal",
//             keep: true, };
//       TagCloud(container, skills, options);}
//     },[])
// return(
//     <>
//     <span className="tagcloud"></span>
//     </>
// )
// }


    return (
        <>
        <div className='about-page_wrapper' onScroll={updateSection}>



            <section className='sec1' >
                {/* <p className='par'>HELLO ::::</p>
                <p className='par'>:::::::: This is Simin !</p>
                <p className='par'>:::: I am a designer by nature ::::</p>
                <p className='par'>I design websites ::::</p>
                <p className='par'>Buildings ::::</p>
                <p className='par'>Sculptures ::::</p>
                <p className='par'>Theater stages ::::</p>
                <p className='par'>:::::::::: And ::::::::::</p> */}


                <p className='par'>HELLO :::: <br />:::::::: This is Simin !<br /><br />:::: I am a designer by nature ::::<br />I design websites ::::<br />Buildings ::::<br />Sculptures ::::<br />Theater stages ::::<br/><br/>:::::::::: And ::::::::::</p>

            </section>

            <section className='sec2'>
                <h1>:::: EDUCATION ::::</h1>
                <p className='par'>:::: Bachelor of Architecture :::: Azad University of Tehran - Iran ::::</p>
                <p className='par'>:::: MArch Architectural Design :::: University of Illinois At Chicago - USA ::::</p>
                <p className='par'>:::: Full Stack Developer :::: FullStack Academy - USA ::::</p>
            </section>

            <section className='sec3'>
            <h1>:::: Work Experience ::::</h1>
                <p className='par'>:::: 2023-Present :::: Freelance Web-Developer ::::</p>
                <p className='par'>:::: 2020-2022 :::: Architectural Designer ::::</p>
                <p className='par'>:::: 2017-2019 :::: CAD Specialist - GA ::::</p>
                <p className='par'>:::: 2018 - 2018 :::: Architectural Designer ::::</p>
                <p className='par'>:::: 2014-2015 :::: Architectural Designer ::::</p>
            </section>

            <section className='sec4' >
            <h1>:::: Skills ::::</h1>
            <div className='cloud-container'>
                <TextSphere/>
            </div>
            </section>

            <section className='sec5'></section>
            </div>


        <AboutScene/>
        </>
    )
}

export default About
