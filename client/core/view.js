import * as THREE from 'three';
import nipplejs from 'nipplejs';
import common from '../common';
import Stats from 'stats.js';
const ee = common.ee;

export default class View {

  constructor(conf) {
    document.body.className = this.cname;
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

    this.childen =  [];
    this.events = {};
    this.keyPress = {};

    if(conf && conf.stats) {
      this.stats = new Stats();
      document.body.appendChild( this.stats.dom );
    }

    this.initEvents();
  }

  initJoystick() {
    const options = {
      zone: document.body,
      color: 'blue',
      multitouch: false
    };
    this.joystick = nipplejs.create(options);

    this.joystick.on('move', (evt, data) => {
      data.angle.radian+=Math.PI/4; //camera angle
      this.onTouchMouve(Math.min(data.force, 2), data.angle.radian);
    });

    this.joystick.on('end', () => {
      this.onTouchEnd();
    });
  }

  initKeyHandler() {
    this.events.keydown = this.keydown.bind(this);
    this.events.keyup = this.keyup.bind(this);
    document.addEventListener('keydown', this.events.keydown);
    document.addEventListener('keyup', this.events.keyup);
  }

  closeKeyHandler() {
    document.removeEventListener('keydown', this.events.keydown);
    document.removeEventListener('keyup', this.events.keyup);
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
      if(this.stats) {
        this.stats.end();
        this.stats.begin();
      }
    };
    update();
    this.resize();
  }

  stop() {
    this.closeEvents();
    cancelAnimationFrame(this.requestAnimation);
  }

  end() {
    this.joystick.destroy();
    this.closeKeyHandler();
    this.onTouchEnd();
  }

  begin() {
    this.initJoystick();
    this.initKeyHandler();
  }

  resize() {
    this.canvas.style = '';
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    this.camera.resize(width, height);
    this.renderer.setSize(width, height);
  }

  keydown(e) {
    if(this.onTouchMouve) {
      this.keyPress[e.code] = true;
      this.keyToMove(this.keyPress);
    }
  }

  keyup(e) {
    if(this.onTouchMouve) {
      this.keyPress[e.code] = false;
      this.keyToMove(this.keyPress);
    }
  }

  keyToMove(keyPress) {
    if(keyPress.ArrowRight && keyPress.ArrowUp || keyPress.KeyD && keyPress.KeyW) {
      this.onTouchMouve(2, Math.PI/4+Math.PI/4);
    } else if(keyPress.ArrowLeft && keyPress.ArrowUp  || keyPress.KeyA && keyPress.KeyW) {
      this.onTouchMouve(2, Math.PI*3/4+Math.PI/4);
    } else if(keyPress.ArrowLeft && keyPress.ArrowDown  || keyPress.KeyA && keyPress.KeyS) {
      this.onTouchMouve(2, Math.PI*5/4+Math.PI/4);
    } else if(keyPress.ArrowRight && keyPress.ArrowDown || keyPress.KeyD && keyPress.KeyS) {
      this.onTouchMouve(2, Math.PI*7/4+Math.PI/4);
    } else if(keyPress.ArrowRight || keyPress.KeyD) {
      this.onTouchMouve(2, 0+Math.PI/4);
    } else if(keyPress.ArrowUp || keyPress.KeyW) {
      this.onTouchMouve(2, Math.PI/2+Math.PI/4);
    } else if(keyPress.ArrowLeft || keyPress.KeyA) {
      this.onTouchMouve(2, Math.PI+Math.PI/4);
    } else if(keyPress.ArrowDown || keyPress.KeyS) {
      this.onTouchMouve(2, Math.PI*3/2+Math.PI/4);
    } else {
      this.onTouchMouve(0);
    }
  }

  add(child) {
    if(Array.isArray(child)) {
      for(let i=0; i<child.length; i++) {
        child[i].onMount(this);
      }
    } else {
      child.onMount(this);
    }
    this.childen.push(child);
  }

  remove(child) {
    if(Array.isArray(child)) {
      for(let i=0; i<child.length; i++) {
        child[i].onDismount();
      }
    } else {
      child.onDismount();
    }
    const index = this.childen.findIndex(child);
    this.splice(index, 1);
  }

  initEvents() {
    this.events.resize = this.resize.bind(this);
    this.events.end = this.end.bind(this);
    this.events.begin = this.begin.bind(this);

    window.addEventListener('resize', this.events.resize, false);
    ee.on('end',  this.events.end);
    ee.on('start',  this.events.begin);
  }

  closeEvents() {
    window.removeEventListener('resize', this.events.resize);
    ee.off('end',  this.events.end);
    ee.off('start',  this.events.begin);
  }

  dismount() {
    this.stop();
    for( let i=0; i<this.childen.length; i++) {
      const child = this.childen[i];
      if(Array.isArray(child)) {
        for(let i=0; i<child.length; i++) {
          child[i].onDismount();
        }
      } else {
        child.onDismount();
      }
    }

    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    if(this.onDismount) {
      this.onDismount();
    }
  }
}
