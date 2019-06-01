import * as THREE from 'three';
import Entity from '../core/entity';
import material from '../shaders/materialBlock';

class Feed extends Entity {

  constructor(config) {
    super(config);
    const geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    this.element = new THREE.Mesh(geometry, material.clone());
    this.element.matrixAutoUpdate = false;
    this.element.receiveShadow = false;
    this.element.castShadow = true;
    this.element.material.color.setHex(Math.random() * 0xffffff);
    this.move(config.x, config.y, config.z);
    this.constructor.elements.push(this.element);
  }

  onPostDismount() {
    const i = this.constructor.elements.indexOf(this.element);
    this.constructor.elements.splice(i, 1);
  }

}

Feed.elements = [];

export default Feed;