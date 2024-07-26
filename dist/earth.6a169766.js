function e(e){return e&&e.__esModule?e.default:e}var n=globalThis,r={},t={},o=n.parcelRequire94c2;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var o={id:e,exports:{}};return r[e]=o,n.call(o.exports,o,o.exports),o.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},n.parcelRequire94c2=o),(0,o.register)("5qbFo",function(e,n){Object.defineProperty(e.exports,"register",{get:()=>r,set:e=>r=e,enumerable:!0,configurable:!0});var r,t=new Map;r=function(e,n){for(var r=0;r<n.length-1;r+=2)t.set(n[r],{baseUrl:e,path:n[r+1]})}}),o("5qbFo").register(new URL("",import.meta.url).toString(),JSON.parse('["1scgB","earth.6a169766.js","cr0fz","8k_earth_daymap.31dc8b20.jpg","ldDj1","8k_earth_nightmap.a2fa5888.jpg","8CGPB","earthCloud.7d4ee75d.png","4mkO7","earth.eb63173f.js"]'));var i=o("ilwiq"),a=o("5Rd1x"),l={};l=new URL("8k_earth_daymap.31dc8b20.jpg",import.meta.url).toString();var d={};d=new URL("8k_earth_nightmap.a2fa5888.jpg",import.meta.url).toString();var s={};s=new URL("earthCloud.7d4ee75d.png",import.meta.url).toString();var c=o("bi8KT"),i=o("ilwiq");const f=new i.WebGLRenderer;f.setSize(window.innerWidth,window.innerHeight),f.shadowMap.enabled=!0,document.body.appendChild(f.domElement);const m=new i.Scene,w=new i.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3);w.position.z=5;const p=new i.Group;p.rotation.z=-23.4*Math.PI/180,m.add(p),new a.OrbitControls(w,f.domElement).update();const u=(0,c.default)({numStars:2e3});m.add(u);const v=new i.TextureLoader,g=new i.SphereGeometry(1,32,32),h=new i.MeshStandardMaterial({map:v.load(e(l))}),_=new i.Mesh(g,h);p.add(_);const S=new i.MeshBasicMaterial({map:v.load(e(d)),blending:i.AdditiveBlending,transparent:!0,opacity:.5}),b=new i.Mesh(g,S);p.add(b);const x=new i.MeshStandardMaterial({map:v.load(e(s)),blending:i.AdditiveBlending,transparent:!0,opacity:1}),M=function({rimHex:e=35071,facingHex:n=0}={}){let r={color1:{value:new i.Color(e)},color2:{value:new i.Color(n)},fresnelBias:{value:.1},fresnelScale:{value:1},fresnelPower:{value:4}},t=`
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
  `,o=`
  uniform vec3 color1;
  uniform vec3 color2;
  
  varying float vReflectionFactor;
  
  void main() {
    float f = clamp( vReflectionFactor, 0.0, 1.0 );
    gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
  }
  `;return new i.ShaderMaterial({uniforms:r,vertexShader:t,fragmentShader:o,transparent:!0,blending:i.AdditiveBlending})}(),H=new i.Mesh(g,M);H.scale.setScalar(1.01),p.add(H);const R=new i.Mesh(g,x);p.add(R),R.scale.setScalar(1.003);const y=new i.AmbientLight(3355443);m.add(y);const F=new i.DirectionalLight(16777215,1);F.position.set(-2,.5,1.5),m.add(F),function e(){requestAnimationFrame(e),_.rotation.y+=.001,b.rotation.y+=.001,R.rotation.y+=.0023,H.rotation.y+=.002,f.render(m,w)}(),window.addEventListener("resize",()=>{w.aspect=window.innerWidth/window.innerHeight,w.updateProjectionMatrix(),f.setSize(window.innerWidth,window.innerHeight)});
//# sourceMappingURL=earth.6a169766.js.map
