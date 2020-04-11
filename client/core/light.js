import * as THREE from 'three';

export default class Light {

  constructor(config) {
    this.element = new THREE.Object3D();
    this.ambient = new THREE.AmbientLight(0x888888);
    this.directionalLight = new THREE.DirectionalLight(0x888888);
    this.directionalLight.matrixAutoUpdate = false;
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow = new THREE.LightShadow(new THREE.OrthographicCamera(-40, 40, 40, -40, 1, 350));
    this.directionalLight.shadow.bias = 0.001;
    this.directionalLight.shadow.radius = 0.8;
    this.directionalLight.shadow.mapSize.width = 2024;
    this.directionalLight.shadow.mapSize.height = 2024;
    new THREE.Matrix4().makeRotationZ( Math.PI / 2).multiplyVector3( this.directionalLight.shadow.camera.up );//axe up
    this.element.add(this.ambient);
    this.element.add(this.directionalLight);

    this.offsetX = config.deltaX;
    this.offsetY = config.deltaY;
    this.offsetZ = config.deltaZ;

    this.zoom = 1;

    this.move(0, 0, 0);
  }

  move(x, y, z) {
    this.directionalLight.matrix.elements[12] = x + this.offsetX * this.zoom;
    this.directionalLight.matrix.elements[13] = y + this.offsetY * this.zoom;
    this.directionalLight.matrix.elements[14] = z + this.offsetZ * this.zoom;
    this.directionalLight.target.matrixWorld.elements[12] = x;
    this.directionalLight.target.matrixWorld.elements[13] = y;
    this.directionalLight.target.matrixWorld.elements[14] = z;

    this.directionalLight.shadow.camera.zoom = 3/this.zoom;
    this.directionalLight.shadow.camera.updateProjectionMatrix();
  }

  scale(zoom) {
    this.zoom = zoom;
  }

  update(dt, target) {
    this.move(target.x, target.y, target.z);
    this.scale(target.scale);
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
