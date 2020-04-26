import * as THREE from 'three';

export default class Camera {

  constructor(config) {
    const canvas = document.getElementsByTagName('canvas')[0];
    this.element = new THREE.PerspectiveCamera(25, canvas.clientWidth / canvas.clientHeight, 1, 4000);
    this.raycaster = new THREE.Raycaster();
    this.centerScreen = new THREE.Vector2(1,0);
    this.centerScreenCenter = new THREE.Vector2(0,0);

    this.offsetX = config.deltaX;
    this.offsetY = config.deltaY;
    this.offsetZ = config.deltaZ;

    this.zoom = 1;
    this.zoomTarget = 1;

    this.move(0, 0, 0);
  }

  move(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.element.position.x = x + this.offsetX * this.zoom;
    this.element.position.y = y + this.offsetY * this.zoom;
    this.element.position.z = z + this.offsetZ * this.zoom;
    this.element.lookAt(x, y, z);
    this.element.updateProjectionMatrix();
  }

  setZoom(zoom) {
    this.zoom = zoom;
  }

  resize(width, height) {
    this.element.aspect = width / height;
    this.element.updateProjectionMatrix();
  }

  checkIntersection(list) {
    this.raycaster.setFromCamera(this.centerScreenCenter, this.element);
    return this.raycaster.intersectObjects(list);
  }

  update(dt, target) {
    this.zoomTarget = target.size/6;
    const delta = this.zoomTarget - this.zoom;
    this.zoom += delta *  dt * 0.001;
    this.move(target.x, target.y, target.z);
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
