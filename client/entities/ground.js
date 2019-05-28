import * as THREE from 'three';
import Entity from '../core/entity';
import material from '../shaders/materialGround';

export default class Ground extends Entity {

  constructor(config) {
    super(config);
    this.y = -0.5;
    this.size = config.size;
    this.element = new THREE.Object3D();
    this.makeFloor();
    this.makeBorder();
    this.move(this.x, this.y, this.z);
  }

  makeFloor() {
    const geometry = new THREE.PlaneBufferGeometry(this.size, this.size, 2, 2);
    geometry.rotateX(-Math.PI / 2);
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    const floor = new THREE.Mesh(geometry, material);
    floor.matrixAutoUpdate = false;
    floor.matrixWorldNeedsUpdate = false;
    floor.receiveShadow = true;
    this.element.add(floor);
  }
  
  makeBorder() {
    const depth = 600;
    const geometry = new THREE.BoxGeometry( this.size, 10, depth );
    const border1 = new THREE.Mesh( geometry, material );
    border1.matrixAutoUpdate = false;
    border1.matrixWorldNeedsUpdate = false;
    border1.receiveShadow = false;
    const border2 = border1.clone();
    const border3 = border1.clone();
    const border4 = border1.clone();

    border1.translateX(0)
    border1.translateZ(-this.size/2-depth/2)
    border1.rotateY(0);
    border1.updateMatrix();
    this.element.add(border1);

   border2.translateX(0)
    border2.translateZ(this.size/2+depth/2)
    border2.rotateY(Math.PI);
    border2.updateMatrix();
    this.element.add(border2);

    border3.scale.x = (depth*2+this.size)/this.size;
    border3.translateX(-this.size/2-depth/2)
    border3.translateZ(0)
    border3.rotateY(-Math.PI/2);
    border3.updateMatrix();
    this.element.add(border3);

    border4.scale.x = (depth*2+this.size)/this.size;
    border4.translateX(this.size/2+depth/2)
    border4.translateZ(0)
    border4.rotateY(Math.PI/2);
    border4.updateMatrix();
    this.element.add(border4);
  }

}

