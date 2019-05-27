import * as THREE from 'three';

class Entity {

  constructor(config) {
    this.element = new THREE.Object3D();
    this.x = config.x;
    this.y = config.y;
    this.z = config.z;
    this.a = config.a || 0;
    this.scale = config.scale || 1;
    this.dead = false;
    this.size = 1;
    this.value = 0.04;
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
    return this.scale * this.value;
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