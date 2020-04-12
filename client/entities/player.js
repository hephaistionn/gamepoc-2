import * as THREE from 'three';
import Entity from '../core/entity';
import material from '../shaders/materialBlock';
import ee from '../core/eventemitter';
import config from '../config';
const categories = config.categories;

export default class Player extends Entity {

  constructor(config) {
    super(config);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    this.element = new THREE.Mesh(geometry, material);
    this.element.matrixAutoUpdate = false;
    this.element.receiveShadow = false;
    this.element.castShadow = true;
    this.element.name = 'player';

    this.areaSize = config.areaSize;
    this.forceX = 0;
    this.forceZ = 0;
    this.forceFactor = 0.0080;

    this.value = 0;
    this.level = 1;
    this.addValue(0);
    this.move(config.x, config.y, config.z);
  }

  setForce(force, angle) {
    if (force) {
      this.forceX = Math.cos(angle) * (force * this.forceFactor + this.scale/1000);
      this.forceZ = -Math.sin(angle) * (force * this.forceFactor + this.scale/1000); 
      //this.a = -angle;
    } else {
      this.forceX = 0;
      this.forceZ = 0;
    }
  }

  update(dt, feeds) {
    let x = this.x + this.forceX * dt;
    let z = this.z + this.forceZ * dt;

    const marginPlayer = this.scale;

    //border limit
    const borderLimit = (this.areaSize - marginPlayer) / 2;

    x = Math.min(x, borderLimit);
    x = Math.max(x, -borderLimit);

    z = Math.min(z, borderLimit);
    z = Math.max(z, -borderLimit);

    let feed;
    let marginFeed;
    let margin;
    let overlapX;
    let overlapZ;
    let value;
    for (let i in feeds) {
      feed = feeds[i];
      marginFeed = feed.scale;
      margin = (marginFeed + marginPlayer) / 2;
      overlapX = Math.abs(x - feed.x);
      overlapZ = Math.abs(z - feed.z);
      if (overlapX < margin && overlapZ < margin) {
        if (marginPlayer > marginFeed) {
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

    for(let i=1; i<categories.length; i++) {
      if(this.value >= categories[i].value&&this.level===i) {
        if(categories[this.level+1]) {
          this.level = i+1;
          this.value = 0;
          ee.emit('leveled', this.level);
        }
        return;
      }
    }

    this.scale = categories[this.level].factor;

    ee.emit('scored', {sum:this.value, value});
  }
}

