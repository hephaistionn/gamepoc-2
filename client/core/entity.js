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
    if(this.value < 10) {
      this.scale = 1;
    } else if(this.value < 100) {
      this.scale = 2;
    } else if(this.value < 1000) {
      this.scale = 4;
    } else if(this.value < 10000) {
      this.scale = 6;
    } else if(this.value < 100000) {
      this.scale = 8;
    } else if(this.value < 1000000) {
      this.scale = 10;
    } else if(this.value < 10000000) {
      this.scale = 12;
    } else if(this.value < 100000000) {
      this.scale = 15;
    } else if(this.value < 1000000000) {
      this.scale = 19;
    } else if(this.value < 10000000000) {
      this.scale = 25;
    } else if(this.value < 100000000000) {
      this.scale = 32;
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
  }

};

Entity.dying = [];
export default Entity;