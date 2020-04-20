import * as THREE from 'three';

class Entity {

  constructor(config) {
    this.element = new THREE.Object3D();
    this.x = config.x;
    this.y = config.y;
    this.z = config.z;
    this.a = config.a || 0;
    this.dead = false;
    this.size = 1;
  }

  initMatrix(x,y,z,s) {
    //opti to avoid calling every move; 
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = s;
    const matrixWorld = this.element.matrixWorld.elements;
    matrixWorld[12] = this.x
    matrixWorld[13] = this.y + this.size / 2
    matrixWorld[14] = this.z
    matrixWorld[0] = Math.cos(this.a);
    matrixWorld[2] = Math.sin(this.a);
    matrixWorld[5] = 1;
    matrixWorld[8] = -matrixWorld[2];
    matrixWorld[10] = matrixWorld[0];
    matrixWorld[0] = this.size;
    matrixWorld[5] = this.size;
    matrixWorld[10] = this.size;
  }

  move(x, z) {
    this.x = x;
    this.z = z;
    const matrixWorld = this.element.matrixWorld.elements;
    matrixWorld[12] = this.x
    matrixWorld[14] = this.z
  }

  scale(value)  {
    this.size = value;
    const matrixWorld = this.element.matrixWorld.elements;
    matrixWorld[13] = this.y + this.size / 2;
    matrixWorld[0] = this.size;
    matrixWorld[5] = this.size;
    matrixWorld[10] = this.size;
  }

  update(dt) { //only called for dying entity
    if (this.size > 0.2) { 
      this.size -= dt * 0.006 * this.size;
      this.scale(this.size);
    } else {
      const i = this.constructor.dying.indexOf(this);
      this.constructor.dying.splice(i, 1);
      this.onDismount();
    }
  }

  onEat() {
    this.dead = true;
    this.constructor.dying.push(this);
    return this.value;
  }

  onMount(parent) {
    this.parent = parent;
    this.parent.element.add(this.element);
  }

  onDismount() {
    this.element.geometry.dispose();
    this.element.material.dispose();
    this.parent.element.remove(this.element);
    this.parent = null;
    this.onPostDismount();
  }

  onPostDismount() {

  }

};

Entity.dying = [];
export default Entity;