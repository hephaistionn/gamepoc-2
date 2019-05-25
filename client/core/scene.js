import * as THREE from 'three';

export default class Scene {

  constructor() {
    this.requestAnimation = null;
    this.canvas = document.getElementById('D3');
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.element = new THREE.Scene();
    this.element.matrixAutoUpdate = false;
    this.init();
  }

  start() {
    let time;
    const update = () => {
      this.requestAnimation = requestAnimationFrame(update);
      const now = new Date().getTime();
      let dt = now - (time || now);
      time = now;
      dt = Math.min(dt, 100);
      this.renderer.render(this.element, this.camera.element);
      this.update(dt);
    };
    update();
  }

  stop() {
    cancelAnimationFrame(requestAnimation);
  }

  resize(width, height) {
    this.renderer.setSize(width, height);
  }

  add(child) {
    child.onMount(this);
  }

  remove(child) {
    child.onDismount();
  }



}
