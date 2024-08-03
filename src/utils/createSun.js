import * as THREE from 'three';
import { scene } from '../js/main.js';


export function createSun(size, texture) {

    const textureLoader = new THREE.TextureLoader();

    const sunMap = textureLoader.load(texture);
    sunMap.colorSpace = THREE.SRGBColorSpace;
    const sunGeo = new THREE.SphereGeometry(size, 30, 30);
    const sunMat = new THREE.MeshBasicMaterial({
        map: sunMap
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);
    return sun;
}