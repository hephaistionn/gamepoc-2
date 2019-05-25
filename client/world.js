import Scene from './core/scene'
import Camera from './core/camera';
import Light from './core/light';
import Ground from './entities/ground';
import Block from './entities/block';

export default class World extends Scene {

  init() {

    this.camera = new Camera({ x: 0, y: 200, z: 200, tX: 0, tZ: 0 });
    this.light = new Light({ x: -20, y: 20, z: 20 });
    this.ground = new Ground({ x: 0, y: 0, z: 0 });
    this.block = new Block({ x: 0, y: 5, z: 0 });

    this.add(this.camera);
    this.add(this.light);
    this.add(this.ground);
    this.add(this.block);
  }

  update(dt) {
  
  }

  onTouchMouve(force, angle) {
    console.log('onTouchMouve ', angle);
  }

  onTouchEnd() {
    console.log('onTouchEnd ');
  }
}
