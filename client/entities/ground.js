import * as THREE from 'three';
import Entity from '../core/entity';
import material from '../shaders/materialGround';

export default class Ground {

  constructor(config) {
    this.size = config.size;
    this.makeFloor();
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

  onMount(parent) {
    this.parent = parent;
    this.parent.element.add(this.element);
  }

  onDismount() {
    this.element.geometry.dispose();
    this.element.material.dispose();
    this.parent.element.remove(this.element);
    this.parent = null;
  }

}

