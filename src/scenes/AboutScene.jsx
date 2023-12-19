/* eslint-disable no-mixed-spaces-and-tabs */
import * as THREE from 'three';
import  { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import Lenis from '@studio-freight/lenis';
import './About.css'
import waterFragmentShader from '../shaders/water/fragment.glsl';
import waterVertexShader from '../shaders/water/vertex.glsl';
import SplitType from 'split-type';


const AboutScene = () => {

	useEffect(()=> {


	const lenis = new Lenis()
   function raf(time) {
   lenis.raf(time)
   requestAnimationFrame(raf)
   }
   requestAnimationFrame(raf)


THREE.ColorManagement.enabled = false

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
const MainScene = new THREE.Scene();
MainScene.background = new THREE.Color( 0xf0f0f0 );

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
document.body.appendChild( renderer.domElement );

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
MainScene.add(ambientLight)

const light = new THREE.PointLight(0xffffff, 0.5)
light.position.x = 2
light.position.y = 3
light.position.z = 4
MainScene.add(light)

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( -5, 5, 10 );
MainScene.add( spotLight );

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
// MainScene.add( parentTransform );
raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = 1;

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// Wave Material
const debugObject = {}
debugObject.depthColor = '#96B0D9'
debugObject.surfaceColor = '#0D8000'
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

const lineGeo = new THREE.BoxGeometry(6,5,5,100,100,100)
const line = new THREE.Points(lineGeo, waterMaterial)
line.position.set(-1,3,3)
MainScene.add(line)
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//////// ----- Camera.Position -----  /////////
camera.position.z = 4
camera.position.x = -1
camera.position.y = -0.3
// controls.update();
MainScene.add( camera);

////////////////////////////////////////////////////////////////////////////////////////////////
const splitTypes = document.querySelectorAll('.sec1')

splitTypes.forEach((char)=> {
	const text = new SplitType(char, { types: 'chars'})
	gsap.fromTo(text.chars,
	{
		scaleY:0,
		x: -100,
		transformOrigin: 'left',
		opacity: 100,
		color:'#1E549CFF',
	},
	{
		scaleY: 1,
		x: 120,
		duration: 0.7,
		stagger: 0.02,
		scrollTrigger: {
			trigger: '.sec1',
			start: 'left 50%',
			end: 'right 80%',
			scrub: false,
			markers: false,
			duration: 0.2,
			toggleActions: 'play reverse play reverse'
		}
	}
	)
})

const educationSection = document.querySelectorAll('.sec2')

educationSection.forEach((char)=> {
	const text = new SplitType(char, { types: 'chars'})
	gsap.fromTo(text.chars,
	{
		scaleY:0,
		x: -100,
		transformOrigin: 'left',
		opacity: 100,
		color:'#1E549CFF',
	},
	{
		scaleY: 1,
		x: 12,
		duration: 0.7,
		stagger: 0.02,
		scrollTrigger: {
			trigger: '.sec2',
			start: 'left 50%',
			end: 'right 40%',
			scrub: false,
			markers: false,
			duration: 0.2,
			toggleActions: 'play reverse play reverse'
		}
	}
	)
})

const workSection = document.querySelectorAll('.sec3')

workSection.forEach((char)=> {
	const text = new SplitType(char, { types: 'chars'})
	gsap.fromTo(text.chars,
	{
		scaleY:0,
		x: -100,
		transformOrigin: 'left',
		opacity: 100,
		color:'#1E549CFF',
	},
	{
		scaleY: 1,
		x: 1,
		duration: 0.7,
		stagger: 0.02,
		scrollTrigger: {
			trigger: '.sec3',
			start: 'left 50%',
			end: 'right 40%',
			scrub: false,
			markers: false,
			duration: 0.2,
			toggleActions: 'play reverse play reverse'
		}
	}
	)
})

const tagcloud = document.querySelectorAll('.tagcloud')


const objectsDistance = 2

let scrollY = window.scrollY
window.addEventListener('scroll', ()=> {
	scrollY = window.scrollY
})

////////////////////////////////////////////////////////////////////////////////////////////////
function animate() {


	camera.position.y = scrollY / sizes.height * objectsDistance
	const elapsedTime = clock.getElapsedTime()
	waterMaterial.uniforms.uTime.value = elapsedTime

	// const target = controls.target

    // controls.update()
    // controlZoom.target.set(target.x, target.y, target.z)
    // controlZoom.update()

	// theta += 0.005;

    // parentTransform.rotation.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
    // parentTransform.rotation.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
    // parentTransform.rotation.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
    // camera.lookAt( MainScene.position );
    // camera.updateMatrixWorld();



	renderer.render( MainScene, camera );
	window.requestAnimationFrame( animate );
}

animate();
},[])
}

export default AboutScene
