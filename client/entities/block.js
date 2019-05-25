import * as THREE from 'three';
import Entity from '../core/entity';
import material from '../shaders/materialBlock';

export default class Ground extends Entity {

  constructor(config) {
    super(config);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    this.element = new THREE.Mesh(geometry, material);
    this.element.matrixAutoUpdate = false;
    this.element.receiveShadow = false;
    this.element.castShadow = true;

    this.forceX = 0;
    this.forceZ = 0;
    this.forceFactor = 0.002;

    this.move(this.x, this.y, this.z);
  }

  setForce(force, angle) {
    if(force) {
      this.forceX = Math.cos(angle) * force  * this.forceFactor;
      this.forceZ = -Math.sin(angle) * force  * this.forceFactor;
    } else {
      this.forceX = 0;
      this.forceZ = 0;
    }
  }

  update(dt) {
    const x = this.x + this.forceX * dt;
    const z = this.z + this.forceZ * dt;
    this.move(x, 0, z);
  }
}

