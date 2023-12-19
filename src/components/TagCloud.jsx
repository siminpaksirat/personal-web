import React from 'react';
import { useState } from 'react';
import  { useEffect } from 'react';
import TagCloud from "TagCloud";
import '../scenes/About.css'



const TextSphere = ()=> {
    useEffect(()=> {
        return()=> {
    const container = document.querySelectorAll('.tagcloud')
    console.log(container)
    const skills = [':::: JavaScript ::::', ':::: React - React Native ::::', ':::: Responsive Web Design ::::',':::: Version Control/Git ::::',':::: Professional Graphic Design Skills ::::',':::: Problem-Solving Skills ::::',':::: HTML/CSS ::::',':::: THREEJS ::::',':::: WebPack/Vite ::::',':::: Pyton ::::',':::: SQL ::::',':::: Revit ::::',':::: Cinema 4D ::::',':::: Maya ::::',':::: Photoshop CC ::::',':::: AutoCAD ::::',':::: Rhinoceros ::::',':::: Figma ::::']
    const options = {
        radius: 400,
        maxSpeed: "normal",
        initSpeed: "normal",
        keep: true, };
  TagCloud(container, skills, options);}
},[])
}

export default TextSphere;
