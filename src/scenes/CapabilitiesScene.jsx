import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import waterFragmentShader from '../shaders/water/fragment.glsl';
import waterVertexShader from '../shaders/water/vertex.glsl';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin();




import './Capabilities.css';


const CapabilitiesScene = () => {

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

const textureLoader = new THREE.TextureLoader()
THREE.ColorManagement.enabled = false

const clock = new THREE.Clock()

useEffect(()=> {


    const lenis = new Lenis()
    function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)


	THREE.ColorManagement.enabled = false
	const canvas = document.querySelector('canvas.webgl')
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
	const camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.01, 2000);
	camera.minDistance = 2
    camera.maxDistance = 10
    camera.updateProjectionMatrix();

	////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
	antialias: true

});
renderer.autoClear = false;
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.xr.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#000000');

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


const parameters = {
    radius: 2,
    tube: 2,
    tubularSegments: 350,
    radialSegments: 200,
    p: 2,
    q: 3,
    thickness: 0.5
};


const matcap = textureLoader.load('/textures/matcaps/8.png')
const torusMaterial = new THREE.MeshMatcapMaterial({ matcap: matcap })

const torusGeometry = new THREE.TorusKnotGeometry( ...Object.values( parameters ) );

const torus = new THREE.Mesh( torusGeometry, torusMaterial );
torus.name = 'torus';
torus.position.y = 8;
torus.position.z = - 200;
scene.add( torus );



////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const fontLoader = new FontLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/33.png')
const txtAfter = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

////////////////////////////////////////////////////////////////////////////////////////////////

const threeTexts = ()=> {
    const words = ['Critical Thinking', 'Problem-Solving', 'Abstract Thinking', 'Creative Thinking', 'Interdisciplinary Thinking', 'adaptability']
    const zDistance = [45, 30 , 10 , -30, -90 , -170]
    const yDistance = [1,2,3,5,6,8]
    const txtArray = []


    fontLoader.load('/fonts/helvetiker_regular.typeface.json',(font)=> {
        for (let i = 0; i < words.length; i++) {
            const textGeometry = new TextGeometry(words[i], {
                font: font,
                size: 1.0,
                height: 0.01,
                curveSegments: 3,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.03,
                bevelOffset: 0,
                bevelSegments: 5,})

            textGeometry.center()
            const text = new THREE.Mesh(textGeometry, txtAfter)
            text.position.z = zDistance[i]
            text.position.y = yDistance[i]
            text.rotation.x = -Math.PI / 5

            txtArray.push(text)


            const capElement = document.getElementById('cap')
            const txtContainer = document.createElement('div')
            txtContainer.className = 'txt-container'

            txtArray.forEach((text) => {
                scene.add(text);
                capElement.appendChild(txtContainer)

                gsap.fromTo(text.position,
                    {y:-10},
                    {y: 5, duration:15, scrollTrigger:
                        {trigger: '.txt-container',
                        scrub: false,
                        }}
                    )
            });

         }
    })
    txtArray

}
threeTexts()

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// Wave Material
const debugObject = {}
debugObject.depthColor = '#8388A6'
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
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
ambientLight.position.set(2,3,5)
ambientLight.rotation.y = Math.PI /12
scene.add(ambientLight)
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(0,5,-50)
// scene.add( cube );

const floorMesh = new THREE.BoxGeometry( 16, 0.1, 400,20,50,100 );
const ceilingMesh = new THREE.BoxGeometry( 16, 0.1, 400,20,50,100 );
const floor = new THREE.Points(floorMesh, waterMaterial)
const ceiling = new THREE.Points(ceilingMesh, waterMaterial)
floor.position.set(0,0,0)
ceiling.position.set(0,16,0)

scene.add( floor, ceiling );

const wallMesh = new THREE.BoxGeometry(0.05,15,400,200,100,100)
const rightWall = new THREE.Points(wallMesh, waterMaterial)
const leftWall = new THREE.Points(wallMesh, waterMaterial)

rightWall.position.set(8,8,0)
leftWall.position.set(-8,8,0)

scene.add(rightWall, leftWall)



////////////////////////////////////////////////////////////////////////////////////////////////
const controls = new ArcballControls( camera, renderer.domElement, scene );
controls.enabled = true;
controls.enableRotate = false
controls.enableRotate = false;
controls.adjustNearFar = true
controls.enablePan = true
controls.enableZoom = true
controls.cursorZoom = true
controls.maxDistance = 65
controls.minDistance = 0
controls.scaleFactor = 1.3
controls.activateGizmos({isActive: false})
controls._gizmos.visible = false


controls.addEventListener( 'change', function () {

	renderer.render( scene, camera );

} );
camera.position.set( 0, 7, 50 );
controls.update();

////////////////////////
document.body.appendChild( renderer.domElement );
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = 0;
////////////////////////////////////////////////////////////////////////////////////////////////
//////// ----- Camera.Position -----  /////////
camera.position.z = 60
camera.position.x = 0
camera.position.y = 8.5
// controls.update();
scene.add( camera);
////////////////////////////////////////////////////////////////////////////////////////////////
let fov = camera.fov
let zoom = 1.0
let inc = -0.009

// window.addEventListener('wheel', onMouseWheel)
// let y = 8.5
// // let x = 0
// // let z = 50
// let position = 0


function onMouseWheel(event){

	camera.position.z -= event.deltaZ * 0.01
	camera.position.y  = 8.5
	camera.fov = fov * zoom
	zoom += inc;
      if ( zoom <= 0.1 || zoom >= 1.0 ){
         inc = -inc;
       }
}



window.addEventListener('move', onMouseWheel)

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
function animate() {


	const elapsedTime = clock.getElapsedTime()
	waterMaterial.uniforms.uTime.value = elapsedTime

    const time = performance.now() * 0.0003;
    const torus = scene.getObjectByName( 'torus' );
    torus.rotation.x = time * 0.4;
    torus.rotation.y = time;

    camera.updateProjectionMatrix();
	camera.lookAt( torus.position );

	renderer.render( scene, camera );
	window.requestAnimationFrame( animate );
}

animate();

},[])


}

export default CapabilitiesScene
