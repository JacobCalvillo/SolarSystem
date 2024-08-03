import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import sunTexture from '../texture/sun.jpg';
import mercuryTexture from '../texture/mercury.jpg';
import venusTexture from '../texture/venus.jpg';
import earthTexture from '../texture/earthmap1.jpg';
import marsTexture from '../texture/mars.jpg';
import jupiterTexture from '../texture/jupiter.jpg';
import saturnTexture from '../texture/saturn.jpg';
import saturnRingTexture from '../texture/saturn ring.png';
import uranusTexture from '../texture/uranus.jpg';
import uranusRingTexture from '../texture/uranus ring.png';
import neptuneTexture from '../texture/neptune.jpg';
import plutoTexture from '../texture/pluto.jpg';

import { createPlanet } from '../utils/createPlanet.js';
import { createSun } from '../utils/createSun.js';
import getStarfield from '../utils/getStarfield.js';


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

export const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const sun = createSun(40, sunTexture);


const mercury = createPlanet(3.2, mercuryTexture, 50, "Mercury");
const venus = createPlanet(5.8, venusTexture, 66, "Venus");
const earth = createPlanet(6, earthTexture, 84, "Earth");
const mars = createPlanet(4, marsTexture, 100, "Mars");
const jupiter = createPlanet(12, jupiterTexture, 122, "Jupiter");

const saturn = createPlanet(10, saturnTexture, 160, "Saturn", {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanet(7, uranusTexture, 198, "Uranus" ,{
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const neptune = createPlanet(7, neptuneTexture, 222, "Neptune");
const pluto = createPlanet(2.8, plutoTexture, 28, "Pluto");

const stars = getStarfield({ numStars: 2100});

scene.add(stars)

const pointLight = new THREE.PointLight(0xFFFFFF, 30000, 300);
scene.add(pointLight);

function animate() {
    //Self-rotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    //Around-sun-rotation
    mercury.obj.rotateY(0.004);
    venus.obj.rotateY(0.0015);
    earth.obj.rotateY(0.001);
    mars.obj.rotateY(0.0008);
    jupiter.obj.rotateY(0.0002);
    saturn.obj.rotateY(0.00009);
    uranus.obj.rotateY(0.00004);
    neptune.obj.rotateY(0.00001);
    pluto.obj.rotateY(0.000007);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const rayCaster = new THREE.Raycaster();

document.addEventListener('mousedown', onMouseDown);

function onMouseDown(event) {
    const coords = new THREE.Vector2(
        (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        -((event.clientY / renderer.domElement.clientWidth) * 2 - 1)
    );

    rayCaster.setFromCamera(coords, camera);
    console.log('mouse was clicked');

    const intersections = rayCaster.intersectObjects(scene.children, true);

    if (intersections.length > 0) {
        const selectedObject = intersections[0].object;
        const color = new THREE.Color(Math.random(), Math.random(), Math.random());
        selectedObject.material.color = color;
        console.log(`Selected ${selectedObject.name} was clicked`);
        
    }
}
