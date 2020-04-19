import * as THREE from 'three';
import Entity from '../core/entity';
import material from '../shaders/materialBlock';
const geometry = new THREE.BoxGeometry(1, 1, 1);

class Feed extends Entity {

  constructor(config) {
    super(config);
    this.value = config.value;
    this.element = new THREE.Mesh(geometry, material.clone());
    this.element.matrixAutoUpdate = false;
    this.element.receiveShadow = false;
    this.element.castShadow = true;
    this.element.material.color.setHex(Math.random() * 0xffffff);
    this.initMatrix(config.x, config.y, config.z, config.size); //opti
    this.constructor.elements.push(this.element);
  }

  onPostDismount() {
    const i = this.constructor.elements.indexOf(this.element);
    this.constructor.elements.splice(i, 1);
  }
}

Feed.update = function update(dt) {
  for (let i = Feed.dying.length - 1; i > -1; i--) {
    const feed = Feed.dying[i];
    feed.update(dt);
  }
}

Feed.elements = [];

export default Feed;