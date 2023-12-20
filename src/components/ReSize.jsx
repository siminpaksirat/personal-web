import React from 'react';
import { useState } from 'react';
import  { useEffect } from 'react';

const ResizeFunction = ()=> {

    const canvas = document.querySelector('canvas.webgl')

    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    const[currentWindow, setCurrentWindow] = useState(windowWidth)
    const[adjustedSize, setAdjustedSize] = useState(false)






    console.log(`this is window width: ${windowWidth}`)
    console.log(`this is canvas width: ${canvasWidth}`)

}

export default ResizeFunction;
