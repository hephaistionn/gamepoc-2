import * as THREE from 'three';

export default class Camera {

  constructor(config) {
    this.element = new THREE.Object3D();
    this.x = config.x;
    this.y = config.y;
    this.z = config.z;
    this.a = config.a || 0;
  }

  move(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    const matrixWorld = this.element.matrixWorld.elements;
    matrixWorld[12] = this.x;
    matrixWorld[13] = this.y;
    matrixWorld[14] = this.z;
    matrixWorld[0] = Math.cos(this.a);
    matrixWorld[2] = Math.sin(this.a);
    matrixWorld[8] = -matrixWorld[2];
    matrixWorld[10] = matrixWorld[0];
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
