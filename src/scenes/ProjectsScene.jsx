import React, { useEffect } from 'react';
import * as THREE from 'three';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import waterFragmentShader from '../shaders/water/fragment.glsl';
import waterVertexShader from '../shaders/water/vertex.glsl';
gsap.registerPlugin(ScrollTrigger);


import './Projects.css';

const ProjectsScene = () => {

useEffect(()=> {

	THREE.ColorManagement.enabled = false
	const textureLoader = new THREE.TextureLoader()

	const canvas = document.querySelector('canvas.webgl')


	const clock = new THREE.Clock()
	///////////////////////////////////////////////////////////////// Cursor
    const cursor = {}
	cursor.x = 0
	cursor.y = 0

	window.addEventListener('mousemove', (event) =>
	{
		cursor.x = event.clientX / sizes.width - 0.5
		cursor.y = event.clientY / sizes.height - 0.5
	})
	////////////////////////
	///////////////////////////////////////////////////////////////// Scene
	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xf0f0f0 );


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
		//////////////////////////////////////////////////////////////////////////// Camera
		const camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 1000 );
		camera.updateProjectionMatrix();
		////////////////////////
	////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,

});

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#000000');

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
let raycaster, parentTransform;
const radius = 5;
let theta = 0;
const lineGeometry = new THREE.BufferGeometry();
const points_one = [];
const point = new THREE.Vector3();
const direction = new THREE.Vector3();

for ( let i = 0; i < 200; i ++ ) {

	direction.x += Math.random() - 0.5;
	direction.y += Math.random() - 0.5;
	direction.z += Math.random() - 0.5;
	direction.normalize().multiplyScalar( 5 );

	point.add( direction );
	points_one.push( point.x, point.y, point.z );

}
lineGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( points_one, 3 ) );

parentTransform = new THREE.Object3D();
parentTransform.position.x = Math.random() * 40 - 20;
parentTransform.position.y = Math.random() * 40 - 20;
parentTransform.position.z = Math.random() * 40 - 20;

parentTransform.rotation.x = Math.random() * 2 * Math.PI;
parentTransform.rotation.y = Math.random() * 2 * Math.PI;
parentTransform.rotation.z = Math.random() * 2 * Math.PI;

parentTransform.scale.x = Math.random() + 0.5;
parentTransform.scale.y = Math.random() + 0.5;
parentTransform.scale.z = Math.random() + 0.5;

for ( let i = 0; i < 50; i ++ ) {

	let object;

	const lineMaterial = new THREE.LineBasicMaterial( { color: Math.random() * 0xffffff, opacity: 0.1 } );

	if ( Math.random() > 0.5 ) {

		object = new THREE.Line( lineGeometry, lineMaterial );

	} else {

		object = new THREE.LineSegments( lineGeometry, lineMaterial );

	}

	object.position.x = Math.random() * 400 - 200;
	object.position.y = Math.random() * 400 - 200;
	object.position.z = Math.random() * 400 - 200;

	object.rotation.x = Math.random() * 2 * Math.PI;
	object.rotation.y = Math.random() * 2 * Math.PI;
	object.rotation.z = Math.random() * 2 * Math.PI;

	object.scale.x = Math.random() + 0.5;
	object.scale.y = Math.random() + 0.5;
	object.scale.z = Math.random() + 0.5;

	parentTransform.add( object );

}
scene.add( parentTransform );
raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = 1;
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// Wave Material
const debugObject = {}
debugObject.depthColor = '#02008F'
debugObject.surfaceColor = '#02008F'
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
	transparent: true,
	opacity: 1,
	blending:THREE.NormalBlending,

    uniforms:
    {
        uTime: { value: 0 },



        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector3(0.949, 1.104, 7) },
        uBigWavesSpeed: { value: 1.0 },

        uSmallWavesElevation: { value: 0.064 },
        uSmallWavesFrequency: { value: 30.0 },
        uSmallWavesSpeed: { value: 3.101 },
        uSmallIterations: { value: 2.446 },

        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        uColorOffset: { value: 0.0 },
        uColorMultiplier: { value: 0.098 }
    }
})
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
////// IMAGES ////// IMAGES ////// IMAGES ////// IMAGES ////// IMAGES ////// IMAGES ////// IMAGES
////////////////////////////////////////////////////////////////////////////////////////////////
const web = document.querySelectorAll('.web-dev')
const arch = document.getElementById('arch')
const art = document.getElementById('art')


// for(let i = 0; i < 8; i++){
// 	const projectContainer = document.createElement('div')
//     projectContainer.className = 'pro-con'

// 	const geometry = new THREE.BoxGeometry(5, 5, 0.05)

// 	const material = new THREE.MeshBasicMaterial({
// 		map: textureLoader.load(`static/img/web/${i}.jpg`)
// 	})
// 	const img = new THREE.Mesh(geometry, material)
// 	img.position.set(-i*5, 5 )
// 	img.rotation.y = Math.PI /-6

// 	scene.add(img)
// 	web.appendChild(projectContainer)
// }

// const boxMesh = new THREE.BoxGeometry(1,1,1,50,50,50)
// const box = new THREE.Points(boxMesh, waterMaterial)
// box.position.set(0,0,12)



const nodeList = document.querySelectorAll('.modal')

// console.log(modal)


// console.log(eachModal)
const boxMesh = new THREE.BoxGeometry(1,1,1,50,50,50)
const box = new THREE.Points(boxMesh, waterMaterial)
box.position.set(0,0,12)
// scene.add(box)

// const cageMaker = ()=> {
// 	const modal = Array.from(nodeList)
// 	const positions = []
// 	let each = []
// 	const updatedModal = []


// 	for(let i=0; i<modal.length; i++){
// 		let single = modal[i]
// 		console.log(single)
// 		// debugger
// 		let position = single.getBoundingClientRect();
// 		let box = new THREE.Points(boxMesh, waterMaterial)
// 		box.position.set(position.x, position.y, 15)
// 		scene.add(box)

// 	}
// 	// debugger
// 	console.log(each)
// 	// console.log(positions)
// 	// for(let i = 0; i < modal.length; i++){
// 	// 	let coordinate = positions[i]
// 	// 	let box = new THREE.Points(boxMesh, waterMaterial)
// 	// 	box.position.set(coordinate.x, coordinate.y, 15)
// 	// 	scene.add(box)
// 	// }
// }
// cageMaker()






////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////
document.body.appendChild( renderer.domElement );

////////////////////////////////////////////////////////////////////////////////////////////////

//////// ----- Camera.Position -----  /////////
camera.position.z = 15
camera.position.x = 0
camera.position.y = 0
// controls.update();
scene.add( camera);
// ////////////////////////////////////////////////////////////////////////////////////////////////
// window.addEventListener('wheel', onMouseWheel)


// function onMouseWheel(event){
// 	let x = event.deltaX * 0.1

// }

// let scrollY = window.scrollY
// window.addEventListener('scroll', ()=> {
// 	scrollY = window.scrollY
// })

////////////////////////////////////////////////////////////////////////////////////////////////
function animate() {

	// camera.position.y = scrollY / sizes.height * objectsDistance
	const elapsedTime = clock.getElapsedTime()
	waterMaterial.uniforms.uTime.value = elapsedTime

	// position += x
	// x *= 0.4
	// camera.position.x = position

	// position -+ y
	// y *=0.3
	// camera.position.z = position



	theta += 0.005;

    parentTransform.rotation.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
    parentTransform.rotation.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
    parentTransform.rotation.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
    // camera.lookAt( scene.position );
    camera.updateMatrixWorld();





	renderer.render( scene, camera );
	window.requestAnimationFrame( animate );
}

animate();



},[])

}

export default ProjectsScene
