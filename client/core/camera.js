import * as THREE from 'three';

export default class Camera {

  constructor(config) {
    const canvas = document.getElementById('D3');
    this.element = new THREE.PerspectiveCamera(25, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.target = new THREE.Vector3();

    this.x = config.x;
    this.y = config.y;
    this.z = config.z;
    this.tX = config.tX || 0;
    this.tY = config.tY || 0;
    this.tZ = config.tZ || 0;
    this.zoom = 1;

    this.move(this.x, this.y, this.z);
    this.moveTarget(this.tX, this.tY, this.tZ);
    this.scale(this.zoom);
  }

  resize(width, height) {
    this.element.aspect = width / height;
    this.element.updateProjectionMatrix();
  }

  scale(zoom) {
    this.zoom = zoom;
    this.element.zoom = this.zoom;
  }

  move(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.element.position.x = this.x;
    this.element.position.y = this.y;
    this.element.position.z = this.z;
    this.element.lookAt(this.target);
    // this.element.updateProjectionMatrix();
  }

  moveTarget(x, y, z) {
    this.tX = x;
    this.tY = y;
    this.tZ = z;
    this.target.x = this.tX;
    this.target.y = this.tY;
    this.target.z = this.tZ;
    this.element.lookAt(this.target);
    // this.element.updateProjectionMatrix();
  }

  onMount(parent) {
    this.parent = parent;
    this.parent.element.add(this.element);
  }

  onDismount() {
    this.parent.element.remove(this.element);
    this.parent = null;
  }

};
