import * as THREE from 'three';

class Entity {

  constructor(config) {
    this.element = new THREE.Object3D();
    this.x = config.x;
    this.y = config.y;
    this.z = config.z;
    this.a = config.a || 0;
    this.scale = 1;
    this.dead = false;
    this.size = 1;
    this.value = 0;
    this.addValue(config.value || 1);
  }

  move(x, y, z) {
    this.x = x;
    this.y = y + this.size * this.scale / 2;
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

  update(dt) {
    if (this.scale > 0.3) {
      this.scale -= dt * 0.006;
      this.move(this.x, 0, this.z);
    } else {
      const i = this.constructor.dying.indexOf(this);
      this.constructor.dying.splice(i, 1);
      this.onDismount();
    }
  }

  getValue() {
    return this.value;
  }


  addValue(value) {
    this.value += value;
    const totalPoint = 1000;
    const sizeMax = 25;

    if (this.value <= 0.001 * totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.01);
    } else if (this.value <= 0.008 * totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.04);
    } else if (this.value <= 0.027 * totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.09);
    } else if (this.value <= 0.064 * totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.16);
    } else if (this.value <= 0.125 * totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.25);
    } else if (this.value <= 0.216 * totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.36);
    } else if (this.value <= 0.343 * totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.49);
    } else if (this.value <= 0.512 * totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.64);
    } else if (this.value <= 0.729 * totalPoint) {
      this.scale = Math.ceil(sizeMax * 0.81);
    } else if (this.value <= 1 * totalPoint) {
      this.scale = sizeMax * 1;
    }
  }

  checkCollision(block) {
    const margin1 = this.size * this.scale;
    const margin2 = block.size * block.scale;
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