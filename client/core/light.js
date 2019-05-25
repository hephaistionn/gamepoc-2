import * as THREE from 'three';

export default class Light {

  constructor(config) {
    this.element = new THREE.Object3D();
    this.ambient = new THREE.AmbientLight(0x111111);
    this.directionalLight = new THREE.DirectionalLight(0xffffff);
    this.directionalLight.matrixAutoUpdate = false;
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow = new THREE.LightShadow(new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 200));
    this.directionalLight.shadow.bias = 0.001;
    this.directionalLight.shadow.radius = 0.8;
    this.directionalLight.shadow.mapSize.width = 1024;
    this.directionalLight.shadow.mapSize.height = 1024;
    this.element.add(this.ambient);
    this.element.add(this.directionalLight);

    this.parent = null;
    this.x = config.x;
    this.y = config.y;
    this.z = config.z;
    this.tX = config.tX || 0;
    this.tY = config.tY || 0;
    this.tZ = config.tZ || 0;
    this.offsetX = this.x - this.tX;
    this.offsetY = this.y - this.tY;
    this.offsetZ = this.z - this.tZ;
    this.zoom = 1;

    this.move(this.x, this.y, this.z);
  }

  move(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.tX = this.x - this.offsetX;
    this.tY = this.y - this.offsetY;
    this.tZ = this.z - this.offsetZ;

    this.directionalLight.shadow.camera.zoom = this.zoom / 5;
    //this.directionalLight.shadow.camera.updateProjectionMatrix();
    this.directionalLight.matrix.elements[12] = this.x;
    this.directionalLight.matrix.elements[13] = this.y;
    this.directionalLight.matrix.elements[14] = this.z;
    this.directionalLight.target.matrixWorld.elements[12] = this.tX;
    this.directionalLight.target.matrixWorld.elements[13] = this.tY;
    this.directionalLight.target.matrixWorld.elements[14] = this.tZ;
  }

  moveTarget(x, y, z) {
    this.tX = x;
    this.tZ = z;
    this.x = this.offsetX + this.tX;
    this.z = this.offsetZ + this.tZ;

    this.directionalLight.matrix.elements[12] = this.x;
    this.directionalLight.matrix.elements[14] = this.z;
    this.directionalLight.target.matrixWorld.elements[12] = this.tX;
    this.directionalLight.target.matrixWorld.elements[14] = this.tZ;

    // this.helper.update();
  }

  onMount(parent) {
    this.parent = parent;
    this.parent.element.add(this.element);

    // this.helper = new THREE.DirectionalLightHelper(this.directionalLight);
    // this.parent.element.add(this.helper);
  }

  onDismount() {
    this.parent.element.remove(this.element);
    this.parent = null;
  }

};
