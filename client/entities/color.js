import * as THREE from 'three';
import Entity from '../core/entity';
import textures from '../shaders/textures';
import material from '../shaders/materialPlayer';

const colors = [0x009b48,0xb71234,0xffd500, 0x0046ad, 0xff5800 ];
const geometry =  new THREE.BoxGeometry(1, 1, 1);
geometry.translate(0, 1/2, 0);

export default class Color extends Entity {

  constructor(config) {
    super(config);
    this.element = new THREE.Mesh(geometry, material.clone());
    this.element.matrixAutoUpdate = false;
    this.element.material.uniforms.color.value.setHex(colors[config.skin]);
    this.element.material.uniforms.map.value =  textures.list.mapCube;
    this.initMatrix(config.x, config.y, config.z);
  }

}

