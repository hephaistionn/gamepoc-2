import * as THREE from 'three';
import nipplejs from 'nipplejs';
import common from '../common';
const ee = common.ee;
import Stats from 'stats.js';

export default class View {

  constructor(conf) {
    document.body.className = this.constructor.name.split('_')[0];
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.requestAnimation = null;
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.element = new THREE.Scene();
    this.element.matrixAutoUpdate = false;
    this.events = {};

    //this.stats = new Stats();
    //this.stats.showPanel( 0 );
    //document.body.appendChild( this.stats.dom );

    this.initEvents();
    this.init(conf);
    this.start();

    ee.on('end', () =>{
      this.closeJoystick();
      this.joystick = null;
      if(this.onEnd) {
        this.onEnd();
      }
    });
  }

  initEvents() {
    this._resize = this.resize.bind(this);
    window.addEventListener('resize', this._resize, false);
  }

  initJoystick() {
    const options = {
      zone: document.body,
      mode: 'dynamic',
      color: 'blue',
      multitouch: false
    };
    this.joystick = nipplejs.create(options);
    this.joystick.on('move', (evt, data) => {
      if(this.onTouchMouve) {
        data.angle.radian+=Math.PI/4; //camera angle
        this.onTouchMouve(Math.min(data.force, 2), data.angle.radian);
      }
    });

    this.joystick.on('end', () => {
      if(this.onTouchEnd)
        this.onTouchEnd();
    });
  }

  start() {
    let time;
    const update = () => {
      this.requestAnimation = requestAnimationFrame(update);
      //this.stats.begin();
      const now = new Date().getTime();
      let dt = now - (time || now);
      time = now;
      dt = Math.min(dt, 100);
      this.renderer.render(this.element, this.camera.element);
      this.update(dt);
      //this.stats.end();
    };
    update();
    this.resize();
  }

  dismount() {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    if(this.onDismount) {
      this.onDismount();
    }
    this.stop();
  }

  stop() {
    this.closeEvents();
    this.closeJoystick();
    cancelAnimationFrame(this.requestAnimation);
  }

  resize() {
    this.canvas.style = '';
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    this.camera.resize(width, height);
    this.renderer.setSize(width, height);
  }

  add(child) {
    if(Array.isArray(child)) {
      for(let i=0; i<child.length; i++) {
        child[i].onMount(this);
      }
    } else {
      child.onMount(this);
    }
  }

  remove(child) {
    if(Array.isArray(child)) {
      for(let i=0; i<child.length; i++) {
        child[i].onDismount();
      }
    } else {
      child.onDismount();
    }
  }

  closeEvents() {
    window.removeEventListener('resize', this._resize);;
  }

  closeJoystick() {
    if(this.joystick) {
      this.joystick.destroy();
    }
  }
}
