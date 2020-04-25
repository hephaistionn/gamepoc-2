import * as THREE from 'three';
import textures from './textures';

const vertShader = "" +
    "precision highp float; \n" +
    "precision highp int; \n" +
    "uniform mat4 modelMatrix; \n" +
    "uniform mat4 viewMatrix;\n" +
    "uniform mat4 projectionMatrix;\n" +
    "attribute vec3 position; \n" +
    "attribute vec3 normal; \n" +
    "attribute vec2 uv; \n" +
    "varying vec3 vNormal; \n" +
    "varying vec2 vUv; \n" +
    "void main() {" +
    "   vec4 worldPosition = modelMatrix * vec4(position, 1.0 ); \n" +
    "   vNormal = (modelMatrix * vec4(normal, 0.0)).xyz; \n" +
    "   vUv = uv; \n"+
    "   gl_Position = projectionMatrix * viewMatrix * worldPosition; \n" +
    "} ";


const fragShader = "" +
    "precision highp float; \n" +
    "precision highp int; \n" +
    "uniform float cut; \n" +
    "uniform vec3 color; \n" +
    "uniform float blink; \n" +
    "uniform sampler2D map; \n"+
    "varying vec3 vNormal; \n" +
    "varying vec2 vUv; \n" +
    "" +
    "void main(void) { \n" +
    "   vec3 lightDirection = vec3(-0.2762, 0.9206, 0.2762);\n" +
    "   float light = min (1.0, 0.5 + max(0.0,dot(lightDirection, normalize( vNormal ))));\n"+
    "   vec3 texture =  texture2D( map, vUv ).xyz * color;\n"+
    "   vec3 rgb  = max(texture.xyz * light, vec3(blink)); \n" +
    "   gl_FragColor = vec4(rgb , 1.0); \n" +
    "}";

const uniforms = {
  color:  {type: 'vec3', value: new THREE.Color(0xff00ee)},
  blink:  {type: 'f', value: 0},
  map: {type: 't'}
}

const material = new THREE.RawShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertShader,
  fragmentShader: fragShader,
  shadowSide: THREE.FrontSide
});

export default material;
