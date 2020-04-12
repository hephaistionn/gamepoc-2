import * as THREE from 'three';
import Entity from '../core/entity';
import material from '../shaders/materialBlock';
import ee from '../core/eventemitter';

export default class Player extends Entity {

  constructor(config) {
    super(config);
    const geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    this.element = new THREE.Mesh(geometry, material);
    this.element.matrixAutoUpdate = false;
    this.element.receiveShadow = false;
    this.element.castShadow = true;

    this.areaSize = config.areaSize;
    this.size = 1;
    this.forceX = 0;
    this.forceZ = 0;
    this.forceFactor = 0.003;

    this.move(config.x, config.y, config.z);
  }

  setForce(force, angle) {
    if (force) {
      this.forceX = Math.cos(angle) * force * this.forceFactor * (1 + this.scale / 3);
      this.forceZ = -Math.sin(angle) * force * this.forceFactor * (1 + this.scale / 3);
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

    //border limit
    const borderLimit = (this.areaSize - marginPlayer) / 2;
    if (Math.abs(x) > borderLimit || Math.abs(z) > borderLimit) {
      return;
    }


    let feed;
    let marginFeed;
    let margin;
    let overlapX;
    let overlapZ;
    let value;
    for (let i in feeds) {
      feed = feeds[i];
      marginFeed = feed.size * feed.scale;
      margin = (marginFeed + marginPlayer) / 2;
      overlapX = Math.abs(x - feed.x);
      overlapZ = Math.abs(z - feed.z);
      if (overlapX < margin && overlapZ < margin) {
        if (marginPlayer >= marginFeed) {
          value = feed.onEat();
          this.addValue(value);
          feeds.splice(i, 1);
          i--;
        } else {
          if (overlapX > overlapZ) {
            if(x > feed.x) {
              x = feed.x+margin;
            }else {
              x = feed.x-margin;
            }
          } else {
            if(z > feed.z) {
              z = feed.z+margin;
            }else {
              z = feed.z-margin;
            }
          }
        }
      }
    }
    this.move(x, 0, z);
  }

  addValue(value) {
    this.value += value;
    const totalPoint = 25000;
    const sizeMax = 25;
    if (this.value < 0.0004*totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.01);
    } else if (this.value < 0.005*totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.04);
    } else if (this.value < 0.027*totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.09);
    } else if (this.value < 0.064*totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.16);
    } else if (this.value < 0.125*totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.25);
    } else if (this.value < 0.216*totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.36);
    } else if (this.value < 0.343*totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.49);
    } else if (this.value < 0.512*totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.64);
    } else if (this.value < 0.729*totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.81);
    } else if (this.value < 1*totalPoint) {
      this.scale = sizeMax * 1;
    }
    ee.emit('scored', value);
  }
}

