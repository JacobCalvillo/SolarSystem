import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import earthMap from '../texture/8k_earth_daymap.jpg';
import earthMapNight from '../texture/8k_earth_nightmap.jpg';
import cloudsMap from '../texture/earthCloud.png';

import getStarfield from '../utils/getStarfield';
import { getFresnelMat } from '../utils/getFresnelMat';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const stars = getStarfield({numStars: 2000});
scene.add(stars);

const textureLoader = new THREE.TextureLoader();
const geometry = new THREE.SphereGeometry(1, 32, 32); // Usar SphereGeometry para un planeta
const material = new THREE.MeshStandardMaterial({
    map: textureLoader.load(earthMap),
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const nightMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(earthMapNight),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.5,
});
const nightMesh = new THREE.Mesh(geometry, nightMaterial);
earthGroup.add(nightMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(cloudsMap),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 1
});

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);


const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
earthGroup.add(cloudsMesh);

cloudsMesh.scale.setScalar(1.003);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

function animate() {
    requestAnimationFrame(animate);
    earthMesh.rotation.y += 0.001;// Rotación lenta de la tierra
    nightMesh.rotation.y += 0.001;
    cloudsMesh.rotation.y += 0.0023;
    glowMesh.rotation.y += 0.002;
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
