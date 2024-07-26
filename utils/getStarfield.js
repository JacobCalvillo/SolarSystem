import * as THREE from "three";

export default function getStarfield({ numStars = 500 } = {}) {
  const stars = new THREE.Group();

  function randomSpherePoint(center, minRadius, maxRadius) {
    const radius = Math.random() * (maxRadius - minRadius) + minRadius;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta) + center.x;
    let y = radius * Math.sin(phi) * Math.sin(theta) + center.y;
    let z = radius * Math.cos(phi) + center.z;

    return new THREE.Vector3(x, y, z);
  }

  // Define el centro alrededor del cual se distribuirán las estrellas (posición del sol)
  const center = new THREE.Vector3(0, 0, 0);
  const minRadius = 100; // Radio mínimo desde el sol
  const maxRadius = 200; // Radio máximo desde el sol

  for (let i = 0; i < numStars; i++) {
    const position = randomSpherePoint(center, minRadius, maxRadius);
    const hue = 0.6;
    const color = new THREE.Color().setHSL(hue, 0.2, Math.random());

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(position.toArray(), 3)
    );
    starGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(color.toArray(), 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      map: new THREE.TextureLoader().load("../src/texture/circle.png"),
    });

    const star = new THREE.Points(starGeometry, starMaterial);
    stars.add(star);
  }

  return stars;
}
