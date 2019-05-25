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
    this.move(this.x, this.y, this.z);
  }

}

