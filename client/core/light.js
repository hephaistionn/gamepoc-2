import * as THREE from 'three';

export default class Light {

  constructor(config) {
    this.element = new THREE.Object3D();
    this.ambient = new THREE.AmbientLight(0xeeeeee);
    this.directionalLight = new THREE.DirectionalLight(0x888888);
    this.directionalLight.matrixAutoUpdate = false;
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow = new THREE.LightShadow(new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 4000));
    this.directionalLight.shadow.bias = 0.001;
    this.directionalLight.shadow.radius = 1.3; //blur 
    this.directionalLight.shadow.mapSize.width = 2048*2;
    this.directionalLight.shadow.mapSize.height = 2048*2;
    new THREE.Matrix4().makeRotationZ( Math.PI/4).multiplyVector3( this.directionalLight.shadow.camera.up );//axe up
    this.element.add(this.ambient);
    this.element.add(this.directionalLight);

    this.offsetX = config.deltaX;
    this.offsetY = config.deltaY;
    this.offsetZ = config.deltaZ;

    this.zoom = 100;

    this.move(0, 0, 0);
  }

  move(x, y, z) {
    this.directionalLight.matrix.elements[12] = x + this.offsetX * 400;
    this.directionalLight.matrix.elements[13] = y + this.offsetY * 400;
    this.directionalLight.matrix.elements[14] = z + this.offsetZ * 400
    this.directionalLight.target.matrixWorld.elements[12] = x;
    this.directionalLight.target.matrixWorld.elements[13] = y;
    this.directionalLight.target.matrixWorld.elements[14] = z;

    //this.directionalLight.shadow.camera.zoom = 0.014; for scale 5
    this.directionalLight.shadow.camera.zoom = 0.07/this.zoom;
    this.directionalLight.shadow.camera.updateProjectionMatrix();
  }

  scale(zoom) {
    this.zoom = zoom;
  }

  update(dt, target) {
    this.scale(target.size);
    this.move(target.x, target.y, target.z);
  }

  onMount(parent) {
    this.parent = parent;
    this.parent.element.add(this.element);
  }

  onDismount() {
    this.parent.element.remove(this.element);
    this.parent = null;
  }

};
