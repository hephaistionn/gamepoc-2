import * as THREE from 'three';
import Entity from '../core/entity';
import material from '../shaders/materialBlock';

export default class Ground extends Entity {

  constructor(config) {
    super(config);
    const geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    this.element = new THREE.Mesh(geometry, material);
    this.element.matrixAutoUpdate = false;
    this.element.receiveShadow = false;
    this.element.castShadow = true;

    this.forceX = 0;
    this.forceZ = 0;
    this.forceFactor = 0.002;
    this.move(config.x, config.y, config.z);
  }

  setForce(force, angle) {
    if(force) {
      this.forceX = Math.cos(angle) * force  * this.forceFactor * (1 + this.scale/2);
      this.forceZ = -Math.sin(angle) * force  * this.forceFactor * (1 + this.scale/2);
      //this.a = -angle;
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

  eat(feeds) {
    let feed; let margin;
    for (let i in feeds) {
      feed = feeds[i];
      margin = (feed.size * feed.scale + this.size * this.scale)/2;
      if(Math.abs(this.x-feed.x)<margin && Math.abs(this.z-feed.z)<margin) {
        feed.onDismount();
        feeds.splice(i, 1);
        i--;
        this.scale += feed.getValue();
      }
    }
  }
}

