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
    this.retroForceX = 0;
    this.retroForceZ = 0;
    this.retroForceMax = 0.045;
    this.forceFactor = 0.002;
    this.rebound = 0.1;
    this.debound = 0.008

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
    let x = this.x + (this.forceX + this.retroForceX) * dt;
    let z = this.z + (this.forceZ + this.retroForceZ) * dt;

    const eX = 0 - this.retroForceX;
    const eZ = 0 - this.retroForceZ;

    this.retroForceX += eX * dt  * this.debound;
    this.retroForceZ += eZ * dt  * this.debound;

    if(Math.abs(this.retroForceX)<0.0001){
      this.retroForceX = 0;
    }
    if(Math.abs(this.retroForceZ)<0.0001){
      this.retroForceZ = 0;
    }

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
          this.retroForceX = -(this.forceX+this.retroForceX) * dt * this.rebound * marginFeed/marginPlayer;
          this.retroForceZ = -(this.forceZ+this.retroForceZ) * dt * this.rebound * marginFeed/marginPlayer;
          this.retroForceX = Math.min(Math.abs(this.retroForceX), this.retroForceMax) * Math.sign(this.retroForceX);
          this.retroForceZ = Math.min(Math.abs(this.retroForceZ), this.retroForceMax) * Math.sign(this.retroForceZ);
          return;
        }
      }
    }
    this.move(x, 0, z);  
  }
}

