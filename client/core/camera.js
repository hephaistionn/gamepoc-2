import * as THREE from 'three';

export default class Camera {

  constructor(config) {
    const canvas = document.getElementById('D3');
    this.element = new THREE.PerspectiveCamera(25, canvas.clientWidth / canvas.clientHeight, 0.1, 3000);
    this.target = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();
    this.centerScreen = new THREE.Vector2(0,0);

    this.x = config.x;
    this.y = config.y;
    this.z = config.z;
    this.tX = config.tX || 0;
    this.tY = config.tY || 0;
    this.tZ = config.tZ || 0;
    this.offsetX = this.x - this.tX;
    this.offsetY = this.y - this.tY;
    this.offsetZ = this.z - this.tZ;
    this.zoom = 0.5;
    this.zoomTarget = 1;

    this.move(this.x, this.y, this.z);
    this.moveTarget(this.tX, this.tY, this.tZ);;
  }

  update(dt) {
    const delta = this.zoomTarget - this.zoom;
    this.zoom += delta *  dt * 0.001;
  }

  resize(width, height) {
    this.element.aspect = width / height;
    this.element.updateProjectionMatrix();
  }

  scale(zoom) {
    this.zoomTarget = zoom;
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
    this.tZ = z;
    this.x = (this.offsetX * this.zoom) + this.tX;
    this.y = (this.offsetY * this.zoom) + this.tY;
    this.z = (this.offsetZ * this.zoom) + this.tZ;

    this.element.position.x = this.x;
    this.element.position.y = this.y;
    this.element.position.z = this.z;
    this.target.x = this.tX;
    this.target.z = this.tZ;

    this.element.lookAt(this.target);
    this.element.updateProjectionMatrix();
  }

  checkIntersection(list) {
    this.raycaster.setFromCamera(this.centerScreen, this.element);
    return this.raycaster.intersectObjects(list);
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
