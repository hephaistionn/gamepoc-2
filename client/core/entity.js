import * as THREE from 'three';

class Entity {

  constructor(config) {
    this.element = new THREE.Object3D();
    this.x = config.x;
    this.y = config.y;
    this.z = config.z;
    this.a = config.a || 0;

    this.dead = false;
    this.scale = 1;
    this.size = 1;
  }

  move(x, y, z) {
    this.x = x;
    this.y = y + this.scale / 2;
    this.z = z;
    const matrixWorld = this.element.matrixWorld.elements;
    matrixWorld[12] = this.x
    matrixWorld[13] = this.y
    matrixWorld[14] = this.z
    matrixWorld[0] = Math.cos(this.a);
    matrixWorld[2] = Math.sin(this.a);
    matrixWorld[5] = 1;
    matrixWorld[8] = -matrixWorld[2];
    matrixWorld[10] = matrixWorld[0];

    matrixWorld[0] *= this.scale;
    matrixWorld[5] *= this.scale;
    matrixWorld[10] *= this.scale;
  }

  update(dt) { //only called for dying entity
    if (this.scale > 0.2) { 
      this.scale -= dt * 0.006 * this.scale;
      this.move(this.x, 0, this.z);
    } else {
      const i = this.constructor.dying.indexOf(this);
      this.constructor.dying.splice(i, 1);
      this.onDismount();
    }
  }

  checkCollision(block) {
    const margin1 = this.scale;
    const margin2 = block.scale;
    const margin = (margin1 + margin2) / 2;
    const overlapX = Math.abs(this.x - block.x);
    const overlapZ = Math.abs(this.z - block.z);
    return overlapX < margin && overlapZ < margin
  }

  freePosition(blocks) {
    for(let i in blocks) {
      if(this.checkCollision(blocks[i])) {
        return false;
      }
    }
    return true;
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