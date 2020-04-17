import * as THREE from 'three';
import Entity from '../core/entity';
import material from '../shaders/materialGround';

export default class Ground extends Entity {

  constructor(config) {
    super(config);
    this.y = -0.5;
    this.size = config.size;
    this.scale = 1;
    this.makeFloor();
    this.move(this.x, this.y, this.z);
  }

  makeFloor() {
    const geometry = new THREE.BoxGeometry(this.size, 50, this.size, 2);
    geometry.computeBoundingBox();
    this.element = new THREE.Mesh(geometry, material);
    this.element.translateY(-25);
    this.element.updateMatrix();
    this.element.updateMatrix();
    this.element.matrixAutoUpdate = false;
    this.element.matrixWorldNeedsUpdate = true;
    this.element.receiveShadow = true;
  }
  
}

