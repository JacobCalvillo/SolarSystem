import"./styles-DDBb9j83.js";import{C as d,S as x,A as i,W as y,a as b,P,G as z,O as C,g as F,T as L,b as _,M as m,c as n,d as W,e as j,D as A}from"./getStarfield-BR4NsVdD.js";const B="https://JacobCalvillo.github.io/SolarSystem/assets/8k_earth_daymap-gpFvjAck.jpg",G="https://JacobCalvillo.github.io/SolarSystem/assets/8k_earth_nightmap-KScog_6Q.jpg",R="https://JacobCalvillo.github.io/SolarSystem/assets/earthCloud-Cr_PifaY.png";function H({rimHex:u=35071,facingHex:g=0}={}){const v={color1:{value:new d(u)},color2:{value:new d(g)},fresnelBias:{value:.1},fresnelScale:{value:1},fresnelPower:{value:4}},M=`
  uniform float fresnelBias;
  uniform float fresnelScale;
  uniform float fresnelPower;
  
  varying float vReflectionFactor;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  
    vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
  
    vec3 I = worldPosition.xyz - cameraPosition;
  
    vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );
  
    gl_Position = projectionMatrix * mvPosition;
  }
  `,S=`
  uniform vec3 color1;
  uniform vec3 color2;
  
  varying float vReflectionFactor;
  
  void main() {
    float f = clamp( vReflectionFactor, 0.0, 1.0 );
    gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
  }
  `;return new x({uniforms:v,vertexShader:M,fragmentShader:S,transparent:!0,blending:i})}const e=new y;e.setSize(window.innerWidth,window.innerHeight);e.shadowMap.enabled=!0;document.body.appendChild(e.domElement);const a=new b,o=new P(75,window.innerWidth/window.innerHeight,.1,1e3);o.position.z=5;const t=new z;t.rotation.z=-23.4*Math.PI/180;a.add(t);const k=new C(o,e.domElement);k.update();const E=F({numStars:2e3});a.add(E);const s=new L,r=new _(1,32,32),I=new m({map:s.load(B)}),w=new n(r,I);t.add(w);const J=new W({map:s.load(G),blending:i,transparent:!0,opacity:.5}),f=new n(r,J);t.add(f);const N=new m({map:s.load(R),blending:i,transparent:!0,opacity:1}),D=H(),l=new n(r,D);l.scale.setScalar(1.01);t.add(l);const c=new n(r,N);t.add(c);c.scale.setScalar(1.003);const O=new j(3355443);a.add(O);const h=new A(16777215,1);h.position.set(-2,.5,1.5);a.add(h);function p(){requestAnimationFrame(p),w.rotation.y+=.001,f.rotation.y+=.001,c.rotation.y+=.0023,l.rotation.y+=.002,e.render(a,o)}p();window.addEventListener("resize",()=>{o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight)});
