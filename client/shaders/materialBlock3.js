const THREE = require('three');

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
    "   vUv = uv;  \n" +
    "   gl_Position = projectionMatrix * viewMatrix * worldPosition; \n" +
    "} ";


const fragShader = "" +
    "precision highp float; \n" +
    "precision highp int; \n" +
    "uniform float opacity; \n" +
    "uniform vec3 color; \n" +
    "uniform vec3 size; \n" +
    "varying vec3 vNormal; \n" +
    "varying vec2 vUv; \n" +
    "" +
    "void main(void) { \n" +
    "   vec3 lightDirection = vec3(0.39036, 0.7807, 0.48795);\n" +
    "   float light = dot(lightDirection, normalize( vNormal ));\n"+
    "   vec3 texture = color;\n"+



 
    "   if (vNormal.x > 0.0) {"+
    "       if (mod(vUv.x+0.025, 1.0) < 0.05 && vUv.x > 0.025 && vUv.x < size.z-0.025) {\n"+
    "           texture = color*0.5;\n"+
    "       } \n"+
    "       if (mod(vUv.y+0.025, 1.0) < 0.05 && vUv.y > 0.025 && vUv.y < size.y-0.025) {\n"+
    "           texture = color*0.5;\n"+
    "       } \n"+
    "   } \n"+
    
    "   if (vNormal.y > 0.0) {"+
    "       if (mod(vUv.x+0.025, 1.0) < 0.05 && vUv.x > 0.025 && vUv.x < size.x-0.025) {\n"+
    "           texture = color*0.5;\n"+
    "       } \n"+
    "       if (mod(vUv.y+0.025, 1.0) < 0.05 && vUv.y > 0.025 && vUv.y < size.z-0.025) {\n"+
    "           texture = color*0.5;\n"+
    "       } \n"+
    "   } \n"+
    
    "   if (vNormal.z > 0.0) {"+
    "       if (mod(vUv.x+0.025, 1.0) < 0.05 && vUv.x > 0.025 && vUv.x < size.x-0.025) {\n"+
    "           texture = color*0.5;\n"+
    "       } \n"+
    "       if (mod(vUv.y+0.025, 1.0) < 0.05 && vUv.y > 0.025 && vUv.y < size.y-0.025) {\n"+
    "           texture = color*0.5;\n"+
    "       } \n"+
    "   } \n"+



    "   if (vUv.x < 0.025 || vUv.x > size.x-0.025 || vUv.y < 0.025 || vUv.y > size.x-0.025) {\n"+
    "       texture = texture*1.15;\n"+
    "   }"+

    "   vec3 rgb  = max(texture.xyz  * light * 1.2, texture.xyz * vec3(0.45)); \n" +
    "   gl_FragColor = vec4(rgb , opacity); \n" +
    "}";

const uniforms = THREE.UniformsUtils.merge([
    THREE.UniformsLib['common'],  
]);

uniforms.opacity = {type: 'f', value: 1.0};
uniforms.size = {type: 'vec3', value: new THREE.Vector3(1.0,1.0,1.0)};
uniforms.color =  {type: 'vec3', value: new THREE.Color(0xeeeeee)};

const material = new THREE.RawShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertShader,
    fragmentShader: fragShader,
    shadowSide: THREE.FrontSide
});
material.transparent = true;

module.exports = material;

