import common from '../common';
import * as THREE from 'three';
import Entity from '../core/entity';
import material from '../shaders/materialBlock';
const geometryRef = new THREE.BoxGeometry(1, 1, 1);
const colors = [0x009b48,0xffffff,0xb71234,0xffd500, 0x0046ad, 0xff5800 ];


const geometries = {};
const groups = common.groups;
for(let v=0; v<groups.length; v++) {
  const size = groups[v].size;
  const geo = geometryRef.clone();
  geo.uvsNeedUpdate = true;
  const faceVertexUvs = geo.faceVertexUvs[0];
  for(let i=0;i<faceVertexUvs.length; i++) {
    const uv = faceVertexUvs[i];
    for(let k=0; k<uv.length; k++) {
      uv[k].x *= size; 
      uv[k].y *= size;
    }
  }
  geometries[size] = geo;
}


class Feed extends Entity {

  constructor(config) {
    super(config);
    this.value = config.value;
    this.element = new THREE.Mesh(geometries[config.size], material.clone());
    this.element.matrixAutoUpdate = false;
    this.element.receiveShadow = false;
    this.element.castShadow = true;
    this.element.material.color.setHex(colors[Math.floor(Math.random()*5.999)]);
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