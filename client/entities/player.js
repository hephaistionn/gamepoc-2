import * as THREE from 'three';
import Entity from '../core/entity';
import material from '../shaders/materialBlock';

export default class Player extends Entity {

  constructor(config) {
    super(config);
    const geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    this.element = new THREE.Mesh(geometry, material);
    this.element.matrixAutoUpdate = false;
    this.element.receiveShadow = false;
    this.element.castShadow = true;

    this.size = 1.2;
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

  update(dt, feeds) {
    let x = this.x + this.forceX * dt;
    let z = this.z + this.forceZ * dt;

    const marginPlayer = this.size * this.scale;
    let feed;
    let marginFeed;
    let margin;
    for (let i in feeds) {
      feed = feeds[i];
      marginFeed = feed.size * feed.scale;
      margin = (marginFeed + marginPlayer)/2;
      if(Math.abs(x-feed.x)<margin && Math.abs(z-feed.z)<margin) {
        if(marginPlayer > marginFeed) {
          feed.onDismount();
          feeds.splice(i, 1);
          this.scale += feed.getValue();
          i--;
        } else {
          return;
        }
      }
    }
    this.move(x, 0, z);  
  }
}

