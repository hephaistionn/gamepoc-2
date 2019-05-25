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
    this.zoom = 1;

    this.move(this.x, this.y, this.z);
  }

  move(x, y, z) {
    const dx = x - this.x;
    const dy = y - this.y;
    const dz = z - this.z;
    this.x = x;
    this.y = y;
    this.z = z;
    this.tX += dx;
    this.tY += dy;
    this.tZ += dz;

    this.directionalLight.shadow.camera.zoom = this.zoom / 5;
    //this.directionalLight.shadow.camera.updateProjectionMatrix();
    this.directionalLight.matrix.elements[12] = this.x;
    this.directionalLight.matrix.elements[13] = this.y;
    this.directionalLight.matrix.elements[14] = this.z;
    this.directionalLight.target.matrixWorld.elements[12] = this.tX;
    this.directionalLight.target.matrixWorld.elements[13] = this.tY;
    this.directionalLight.target.matrixWorld.elements[14] = this.tZ;
  }

  onMount(parent) {
    this.parent = parent;
    this.parent.element.add(this.element);

    const helper = new THREE.DirectionalLightHelper(this.directionalLight);
    this.parent.element.add(helper);
  }

  onDismount() {
    this.parent.element.remove(this.element);
    this.parent = null;
  }

};
