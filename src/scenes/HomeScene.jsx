import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

import './Home.css';


import waterFragmentShader from '../shaders/water/fragment.glsl';
import waterVertexShader from '../shaders/water/vertex.glsl';

import ResizeFunction from '../components/ReSize';

const HomeScene = () => {
    useEffect(()=> {



// Debug
// const gui = new dat.GUI({ width: 340 })
const debugObject = {}

const textureLoader = new THREE.TextureLoader()
THREE.ColorManagement.enabled = false

const canvas = document.querySelector('canvas.webgl')
const root = document.getElementById('root')

///////////////////////////////////////////////////////////////// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf0f0f0 );
// scene.fog = new THREE.FogExp2('#E1FF00', 0.02)
////////////////////////

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

//////////////////////////////////////////////////////////////////////////// Camera
let camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 1000 );
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


//////////////////////////////////////////////////////////////////////////// Controls
const controls = new OrbitControls( camera, canvas );
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.12
controls.enableZoom = false
controls.autoRotate = true

const controlZoom = new TrackballControls(camera, canvas)
controlZoom.noRotate = true
controlZoom.noPan = true
controlZoom.noZoom = false
controlZoom.zoomSpeed = .1
////////////////////////


///////////////////////////////////////////////////////////////// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
	alpha: true,
	antialias: true,
});
document.body.appendChild(renderer.domElement);
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#000000');
////////////////////////

//////// ----- Camera.Position -----  /////////

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const light = new THREE.PointLight(0xffffff, 0.5)
light.position.x = 2
light.position.y = 3
light.position.z = 4
scene.add(light)

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( -5, 5, 10 );
scene.add( spotLight );

////////////////////////////////////////////////////////////////////////////////////////////////
// '#96B0D9'
// Colors
debugObject.depthColor = '#96B0D9'
debugObject.surfaceColor = '#FCFFBF'



//////////////// Wave Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
	transparent: true,
	opacity: 1,
	blending:THREE.NormalBlending,

    uniforms:
    {
        uTime: { value: 0 },



        uBigWavesElevation: { value: 0.543 },
        uBigWavesFrequency: { value: new THREE.Vector3(0.949, 1.104, 7) },
        uBigWavesSpeed: { value: 3.751 },

        uSmallWavesElevation: { value: 0.064 },
        uSmallWavesFrequency: { value: 30.0 },
        uSmallWavesSpeed: { value: 3.101 },
        uSmallIterations: { value: 2.446 },

        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        uColorOffset: { value: 1.0 },
        uColorMultiplier: { value: 0.098 }
    }
})


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


const projectsMesh = new THREE.SphereGeometry(12,42,200)
const aboutMesh = new THREE.SphereGeometry(9,42,292)
const capaMesh = new THREE.ConeGeometry( 12, 22, 50, 100);
const capaMesh2 = new THREE.ConeGeometry( 12, 22, 50, 100);

const projects = new THREE.Points(projectsMesh, waterMaterial)
const about = new THREE.Points(aboutMesh, waterMaterial)
const capabilities1 = new THREE.Points(capaMesh, waterMaterial)
const capabilities2 = new THREE.Points(capaMesh2, waterMaterial)

const capabilities = new THREE.Group()
capabilities2.rotation.x = Math.PI / 1
capabilities1.position.set(-25,10,1)
capabilities2.position.set(-25,-10,1)
capabilities.add(capabilities1)
capabilities.add(capabilities2)
capabilities.rotation.x = Math.PI / 8
capabilities.rotation.z = -Math.PI / 6

about.rotation.z = Math.PI / 5
about.rotation.x = Math.PI / 5
projects.position.set(27,5,11)
about.position.set(-3,-24,18)

scene.add(projects, about, capabilities)

projects.name = 'projects'
about.name = 'about'
capabilities.name = 'capabilities'

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const fontLoader = new FontLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/33.png')


fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {



        // Material
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

        // Text
        const textGeometry = new TextGeometry(
            'PROJECTS',
            {
                font: font,
                size: 4.1,
                height: 0.01,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.3,
                bevelSize: 0.1,
                bevelOffset: 0,
                bevelSegments: 5,
            }
        )
        textGeometry.center()
        const text = new THREE.Mesh(textGeometry, material)
		text.name = 'projects'

		let winWidth = window.innerWidth;
		if(winWidth < 500){
			text.position.set(10,25,50)
			text.rotation.x = Math.PI / 8
            text.rotation.y = Math.PI / 6
		} else {
			text.position.set(29,5,11)
			text.rotation.x = Math.PI / 12
            text.rotation.y = Math.PI / 6
		}
        scene.add(text)
	})



		fontLoader.load(
			'/fonts/helvetiker_regular.typeface.json',
			(font) =>
			{

				// Material
				const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

				// Text
				const textGeometry = new TextGeometry(
					'ABOUT',
					{
						font: font,
						size: 3.1,
						height: 0.01,
						curveSegments: 12,
						bevelEnabled: true,
						bevelThickness: 0.3,
						bevelSize: 0.1,
						bevelOffset: 0,
						bevelSegments: 5
					}
				)
				textGeometry.center()

				const text = new THREE.Mesh(textGeometry, material)
				text.name = 'about'

				let winWidth = window.innerWidth;
		        if(winWidth < 500){
					text.position.set(-3,-45,70)
                    text.rotation.x = Math.PI / 6

				} else {
					text.position.set(-3,-25,18)
                    text.rotation.x = Math.PI / 6

				}


				scene.add(text)
			})

				fontLoader.load(
					'/fonts/helvetiker_regular.typeface.json',
					(font) =>
					{
						// Material
						const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

						// Text
						const textGeometry = new TextGeometry(
							'CAPABILITIES',
							{
								font: font,
								size: 2.2,
								height: 0.01,
								curveSegments: 12,
								bevelEnabled: true,
								bevelThickness: 0.3,
								bevelSize: 0.1,
								bevelOffset: 0,
								bevelSegments: 5
							}
						)
						textGeometry.center()

						const text = new THREE.Mesh(textGeometry, material)
						text.name = 'capabilities'

						let winWidth = window.innerWidth;
		                if(winWidth < 500){
							text.position.set(-18,-5,40)
							text.rotation.y = Math.PI /8
							text.rotation.x = Math.PI / 4
							text.rotation.z = Math.PI / 4

						} else {
							text.position.set(-20,10,9)
							text.rotation.y = Math.PI /3
							text.rotation.x = Math.PI / 4

						}


						scene.add(text)
					})

////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

let parentTransform;
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

raycaster.params.Line.threshold = 1;


//////// ----- Camera.Position -----  /////////
camera.position.z = 70
camera.position.x = 0
camera.position.y = -6
scene.add( camera );

camera.lookAt(0, 0, 0);
camera.updateProjectionMatrix();


const clock = new THREE.Clock()
let scrollY = window.scrollY
window.addEventListener('scroll', ()=> {
	scrollY = window.scrollY
})
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// Wave Material

const waterMaterial2 = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
	transparent: true,
	opacity: 1,
	blending:THREE.NormalBlending,

    uniforms:
    {
        uTime: { value: 0 },



        uBigWavesElevation: { value: 0.8 },
        uBigWavesFrequency: { value: new THREE.Vector3(0.5, 1.1, 7) },
        uBigWavesSpeed: { value: 3.751 },

        uSmallWavesElevation: { value: 0.001 },
        uSmallWavesFrequency: { value: 30.0 },
        uSmallWavesSpeed: { value: 3.101 },
        uSmallIterations: { value: 2.446 },

        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        uColorOffset: { value: 3.0 },
        uColorMultiplier: { value: 0.1 }
    }
})


////////////////////////////////////////////////////////////////////////////////////////////////

const contactmesh = new THREE.SphereGeometry(30,300,300)
const contactSphere = new THREE.Mesh(contactmesh, waterMaterial2)
contactSphere.position.set(150,-10,40)
scene.add( contactSphere );
////////////////////////////////////////////////////////////////////////////////////////////////

const phoneSize = ()=> {
	let winWidth = window.innerWidth;
	let canWidth = canvas.width;

	if(winWidth <=500){
		camera.position.z  = 120;
		camera.position.y = -40;
		contactSphere.position.set(130,-50,100)
		projects.position.set(10,25,50)
        about.position.set(-3,-44,78)
		capabilities1.position.set(-20,10,40)
        capabilities2.position.set(-20,-10,40)



	}
}

phoneSize()


////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////    ----- Animate -----    ///////////////////////
function animate() {

	raycaster.setFromCamera( pointer, camera );
	const elapsedTime = clock.getElapsedTime();


	camera.position.x = scrollY * 0.1

	waterMaterial.uniforms.uTime.value = elapsedTime
	waterMaterial2.uniforms.uTime.value = elapsedTime


	theta += 0.005;
    parentTransform.rotation.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
    parentTransform.rotation.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
    parentTransform.rotation.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );

    camera.lookAt( scene.position);
    camera.updateMatrixWorld();
    // controls.update()


	renderer.render( scene, camera );
	window.requestAnimationFrame( animate );
}

animate()
},[])

return (
    <>
	<div className='home-wrapper'>

<section className='home'>
       <div className='links_container' id='txt-link'>
         <a className='capabilities_link' href="/capabilities"></a>
         <a className='projects_link' href="/projects"></a>
         <a className='about_link' href="/about"></a>
       </div>
</section>


	<div className='break'></div>

<section className='contact' id='contact'>
    <div className='contact-container'>

		<p className='big-txt'>:::::: Let's Connect ::::::</p>

		<div className='info'>
			<div className='gmail'>
			<a href="mailto:simin.paksirat2@gmail.com?subject=Your%20Subject&body=Your%20Message">Contact me by mail</a>
		</div>

		<div className='social-links'>
			<a href='https://www.linkedin.com/in/simin-paksirat/'>iN</a>
			<a href='https://www.instagram.com/siminpaksirat/'>IG</a>
			<a href='https://github.com/siminpaksirat'>GH</a>
		</div>

	</div>
</div>
</section>
	</div>


    </>
)

}

export default HomeScene
