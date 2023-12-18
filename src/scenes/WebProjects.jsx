import React, { useEffect } from 'react';
import * as THREE from 'three';


import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


import './Projects.css';


const WebProjects = ()=> {
    useEffect(()=> {
        const lenis = new Lenis()
		function raf(time) {
		lenis.raf(time)
		requestAnimationFrame(raf)
		}
		requestAnimationFrame(raf)


	THREE.ColorManagement.enabled = false
	const textureLoader = new THREE.TextureLoader()
    const canvas = document.querySelector('canvas.webgl')

    const slider = document.getElementById('slider')

    const clock = new THREE.Clock()
// 	///////////////////////////////////////////////////////////////// Cursor
 const cursor = {}
	cursor.x = 0
	cursor.y = 0

	window.addEventListener('mousemove', (event) =>
	{
		cursor.x = event.clientX / sizes.width - 0.5
		cursor.y = event.clientY / sizes.height - 0.5
	})
// 	////////////////////////
	///////////////////////////////////////////////////////////////// Scene
	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xf0f0f0 );

	//////////////////////////////////////////////////////////////////////////// Camera
	const camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.minDistance = 2
	camera.maxDistance = 10
	camera.updateProjectionMatrix();
	////////////////////////
	///////////////////////////////////////////////////////////////// Resize
	const sizes = {
		width: window.innerWidth,
		height: window.innerHeight
	}
	window.addEventListener('resize', () =>
	{
		// Update sizes
		sizes.width = window.innerWidth
		sizes.height = window.innerHeight

		// Update camera
		camera.aspect = sizes.width / sizes.height
		camera.updateProjectionMatrix()

		// Update renderer
		renderer.setSize(sizes.width, sizes.height)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	})
	////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
	antialias: true,
	alpha:true,
});

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#000000');

////////////////////////
slider.appendChild( renderer.domElement );


////////////////////////////////////////////////////////////////////////////////////////////////
//////// ----- Camera.Position -----  /////////
camera.position.z = 4
camera.position.x = -1
camera.position.y = -0.3
// controls.update();
scene.add( camera);
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////// IMAGES ////// IMAGES ////// IMAGES ////// IMAGES ////// IMAGES ////// IMAGES ////// IMAGES
////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////


let scrollX = window.scrollX
window.addEventListener('scroll', ()=> {
	scrollX = window.scrollX
})

function animate() {


	camera.position.x = scrollX / sizes.height
	const elapsedTime = clock.getElapsedTime()


	// const target = controls.target

    // controls.update()
    // controlZoom.target.set(target.x, target.y, target.z)
    // controlZoom.update()


    camera.lookAt( scene.position );
    camera.updateMatrixWorld();

	renderer.render( scene, camera );
	window.requestAnimationFrame( animate );
}

animate();


    },[])
}

export default WebProjects
