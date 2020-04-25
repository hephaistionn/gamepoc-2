import * as THREE from 'three';
import textures from './textures';

const vertShader = "" +
    "precision highp float; \n" +
    "precision highp int; \n" +
    "uniform mat4 modelMatrix; \n" +
    "uniform mat4 viewMatrix;\n" +
    "uniform mat4 projectionMatrix;\n" +
    "uniform float cut; \n" +
    "attribute vec3 position; \n" +
    "attribute vec3 normal; \n" +
    "attribute vec2 uv; \n" +
    "varying vec3 vNormal; \n" +
    "varying vec2 vPosition; \n" +
    "void main() {" +
    "   vec4 worldPosition = modelMatrix * vec4(position, 1.0 ); \n" +
    "   if(cut != 0.0) {\n"+
    "      worldPosition = min(worldPosition, vec4(512.0, 2.0, 512.0, 1.0));\n"+
    "   } \n"+
    "   vNormal = (modelMatrix * vec4(normal, 0.0)).xyz; \n" +
    "   if (normal.x > 0.0) {"+
    "     vPosition = worldPosition.zy;  \n" +
    "   } else if (normal.y > 0.0) {"+
    "     vPosition = worldPosition.xz;  \n" +
    "   } else {"+
    "     vPosition = worldPosition.xy;  \n" +
    "   } \n"+
    "   gl_Position = projectionMatrix * viewMatrix * worldPosition; \n" +
    "} ";


const fragShader = "" +
    "precision highp float; \n" +
    "precision highp int; \n" +
    "uniform float cut; \n" +
    "uniform vec3 color; \n" +
    "uniform vec3 size; \n" +
    "uniform sampler2D map; \n"+
    "varying vec3 vNormal; \n" +
    "varying vec2 vPosition; \n" +
    "" +
    "void main(void) { \n" +
    //"vec3 lightDirection = vec3(0.39036, 0.7807, 0.48795);\n" +
    "   vec3 lightDirection = vec3(-0.2762, 0.9206, 0.2762);\n" +
    "   float light;\n"+
    "   if(cut != 0.0 && vNormal.y > 0.0) {\n"+
    "     light = 0.2;\n"+
    "   } else { \n"+
    "     light += min (1.0, 0.5 + max(0.0,dot(lightDirection, normalize( vNormal ))));\n"+
    "   }  \n"+
    "   vec3 texture =  texture2D( map, vPosition ).xyz * color;\n"+
    "   vec3 rgb  = texture.xyz * light; \n" +
    "   gl_FragColor = vec4(rgb , 1.0); \n" +
    "}";

const uniforms = {
  cut: {type: 'f', value: 0.0},
  size: {type: 'vec3', value: new THREE.Vector3(1.0,1.0,1.0)},
  color:  {type: 'vec3', value: new THREE.Color(0xff00ee)},
  map: {type: 't'}
}

const material = new THREE.RawShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertShader,
  fragmentShader: fragShader,
  shadowSide: THREE.FrontSide
});

export default material;
