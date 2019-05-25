import Scene from './core/scene'
import Camera from './core/camera';
import Light from './core/light';
import Ground from './entities/ground';
import Block from './entities/block';

export default class World extends Scene {

  init() {
    this.camera = new Camera({ x: 0, y: 40, z: 40, tX: 0, tZ: 0 });
    this.light = new Light({ x: -20, y: 40, z: 20 });
    this.ground = new Ground({ x: 0, y: 0, z: 0 });
    this.block = new Block({ x: 0, y: 0, z: 0 });

    this.add(this.camera);
    this.add(this.light);
    this.add(this.ground);
    this.add(this.block);
  }

  update(dt) {
    this.block.update(dt);
    this.camera.moveTarget(this.block.x, this.block.y, this.block.z);
    this.light.moveTarget(this.block.x, this.block.y, this.block.z);
  }

  onTouchMouve(force, angle) {
    this.block.setForce(force, angle);
  }

  onTouchEnd() {
    this.block.setForce(0, 0);
  }
}
