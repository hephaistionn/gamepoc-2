import * as THREE from 'three';
import Entity from '../core/entity';
import material from '../shaders/materialGround';

export default class Ground extends Entity {

  constructor(config) {
    super(config);
    this.y = -0.5;
    this.size = config.size;
    this.scale = 1;
    this.element = new THREE.Object3D();
    this.makeFloor();
    this.move(this.x, this.y, this.z);
  }

  makeFloor() {
    const geometry = new THREE.BoxGeometry(this.size, 50, this.size, 2);
    geometry.computeBoundingBox();
    const floor = new THREE.Mesh(geometry, material);
    floor.translateY(-25);
    floor.updateMatrix();
    floor.matrixAutoUpdate = false;
    floor.matrixWorldNeedsUpdate = false;
    floor.receiveShadow = true;
    this.element.add(floor);
  }
  
}

