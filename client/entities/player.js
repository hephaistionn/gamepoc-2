import * as THREE from 'three';
import Entity from '../core/entity';
import common from '../common';
import textures from '../shaders/textures';
import material from '../shaders/materialPlayer';


const ee = common.ee;
const groups = common.groups.slice(0).reverse();
const colors = [0x009b48,0xb71234,0xffd500, 0x0046ad, 0xff5800 ];
const geometry = new THREE.BoxGeometry(1, 0.01, 1);
geometry.translate(0, -0.5, 0);

export default class Player extends Entity {

  constructor(config) {
    super(config);
    const wireframe = new THREE.EdgesGeometry( geometry );
    this.element = new THREE.LineSegments( wireframe );
    this.element.material.color.setHex(colors[config.skin]);

    this.material = material.clone();
    this.material.uniforms.color.value.setHex(colors[config.skin]);
    this.material.uniforms.map.value = textures.list.mapCube;

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
    this.skin = config.skin;

    this.tempoLevel = 0;
    this.needUpdateBlocks = true;
    this.blink = false;

    this.initMatrix(config.x, config.y+0.1, config.z); //opti
    this.addValue(0);
    this.updateBlock();
  }

  setForce(force, angle) {
    if (force) {
      this.forceX = Math.cos(angle) * (force * this.forceFactor + this.size/1000);
      this.forceZ = -Math.sin(angle) * (force * this.forceFactor + this.size/1000); 
    } else {
      this.forceX = 0;
      this.forceZ = 0;
    }
  }

  update(dt, feeds) {
    let x = this.x + this.forceX * dt;
    let z = this.z + this.forceZ * dt;

    const borderLimit = (this.areaSize - this.size) / 2;
    x = Math.min(x, borderLimit);
    x = Math.max(x, -borderLimit);
    z = Math.min(z, borderLimit);
    z = Math.max(z, -borderLimit);

    let feed;
    let margin;
    let overlapX;
    let overlapZ;
    for (let i = 0; i<feeds.length; i++) {
      feed = feeds[i];
      margin = (feed.size + this.size) / 2;
      overlapX = Math.abs(x - feed.x);
      overlapZ = Math.abs(z - feed.z);
      if (overlapX < margin && overlapZ < margin) {
        if (this.size > feed.size) {
          feed.onEat();
          feeds.splice(i, 1);
          this.addValue(feed.value);
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
    this.updateLevel(dt);
    this.updateBlock();
    this.move(x, z);
    this.moveBlocs(x, z);
  }

  addValue(value) {
    if(this.tempoLevel) return;
    this.value += value;
    for(let i=1; i<groups.length; i++) {
      if(this.value >= groups[i].value && this.level===i) {
        if(groups[this.level+1]) {
          this.tempoLevel = 1000;
        }
        break;
      }
    }
    this.needUpdateBlocks = true;
    ee.emit('scored', {sum:this.value, value});
  }

  updateLevel(dt) {
    if(this.tempoLevel > 0) {
      this.tempoLevel -= dt;
      this.tempoLevel = Math.max(this.tempoLevel, 0);
      this.blink =  Math.floor(this.tempoLevel/100)%3;
      if(this.blink) {   
        this.material.uniforms.blink.value = 1;
      } else {
        this.material.uniforms.blink.value = 0;
      }
      if(this.tempoLevel === 0) {
        this.level += 1;
        this.needUpdateBlocks = true;
      }
    }
  }

  updateBlock() {
    if(this.needUpdateBlocks === false) return;
    const sum = Math.min(this.value, groups[this.level].value);
    let remaining  = sum;
    const size = groups[this.level].size;
    const nbX = size;
    const nbY = size;
    const nbZ = size;

    const gapX = nbX;
    const gapY = nbY*nbX;
    const gapZ = nbY*nbX*nbZ;


    while(this.element.children.length > 0){ 
      this.element.remove(this.element.children[0]); 
    }

    const tz = Math.floor(sum/gapY); //combien de tranches completes
    remaining = sum-tz*gapY; //ce qu'il reste

    const ty = Math.floor(remaining/gapX); //combien de lignes completes
    remaining = remaining-ty*gapX; //ce qu'il reste

    const tx = remaining //combien de blocks

    if(tz) {
      const geoMergeArea = new THREE.BoxGeometry(nbX, tz, nbY);
      this.drawUv(geoMergeArea,nbX, tz, nbY)
      geoMergeArea.translate(0, tz/2, nbY/2-nbY/2);
      const mergeArea = new THREE.Mesh(geoMergeArea, this.material);
      mergeArea.matrixAutoUpdate = false;
      mergeArea.castShadow = true;
      this.element.add(mergeArea);
    }

    if(ty) {
      const geoMergeLine = new THREE.BoxGeometry(nbX, 1, ty);
      this.drawUv(geoMergeLine,nbX, 1, ty)
      geoMergeLine.translate(0, 1/2+tz, ty/2-nbY/2);
      const mergeLine = new THREE.Mesh(geoMergeLine, this.material);
      mergeLine.matrixAutoUpdate = false;
      mergeLine.castShadow = true;
      this.element.add(mergeLine);
    }

    if(tx) {
      const geoMergeBlock = new THREE.BoxGeometry(tx, 1, 1);
      this.drawUv(geoMergeBlock,tx, 1, 1)
      geoMergeBlock.translate(tx/2-nbX/2, 1/2+tz, 1/2+ty-nbY/2);
      const mergeBlock = new THREE.Mesh(geoMergeBlock, this.material);
      mergeBlock.matrixAutoUpdate = false;
      mergeBlock.castShadow = true;
      this.element.add(mergeBlock);
    }

    this.scale(size);
    this.needUpdateBlocks = false;
  }

  moveBlocs(x, z) {
    const children = this.element.children;
    for(let i=0; i<children.length; i++) {
      const matrixWorld = children[i].matrixWorld.elements;
      matrixWorld[12] = x;
      matrixWorld[14] = z;
    }
  }

  drawUv(geo, dx, dy, dz) {
      geo.uvsNeedUpdate = true;
      const faceVertexUvs = geo.faceVertexUvs[0];
      let uv;

      uv = faceVertexUvs[0];
      uv[0].x = 0; uv[0].y = dy;
      uv[1].x = 0; uv[1].y = 0;
      uv[2].x = dz; uv[2].y = dy;

      uv = faceVertexUvs[1];
      uv[0].x = 0; uv[0].y = 0;
      uv[1].x = dz; uv[1].y = 0;
      uv[2].x = dz; uv[2].y = dy;

      uv = faceVertexUvs[4];
      uv[0].x = 0; uv[0].y = dz;
      uv[1].x = 0; uv[1].y = 0;
      uv[2].x = dx; uv[2].y = dz;

      uv = faceVertexUvs[5];
      uv[0].x = 0; uv[0].y = 0;
      uv[1].x = dx; uv[1].y = 0;
      uv[2].x = dx; uv[2].y = dz;

      uv = faceVertexUvs[8];
      uv[0].x = 0; uv[0].y = dy;
      uv[1].x = 0; uv[1].y = 0;
      uv[2].x = dx; uv[2].y = dy;

      uv = faceVertexUvs[9];
      uv[0].x = 0; uv[0].y = 0;
      uv[1].x = dx; uv[1].y = 0;
      uv[2].x = dx; uv[2].y = dy;
  }

}

