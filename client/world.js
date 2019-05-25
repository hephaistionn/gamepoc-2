import Scene from './core/scene'
import Camera from './core/camera';
import Light from './core/light';
import Ground from './entities/ground';
import Block from './entities/block';

export default class World extends Scene {

  init() {

    this.camera = new Camera({ x: 150, y: 150, z: 150, tX: 0, tZ: 0 });
    this.light = new Light({ x: -20, y: 20, z: 20 });
    this.ground = new Ground({ x: 0, y: 0, z: 0 });
    this.block = new Block({ x: 0, y: 5, z: 0 });

    this.add(this.camera);
    this.add(this.light);
    this.add(this.ground);
    this.add(this.block);

    this.x = 0;
    this.z = 0;
    this.rot = 0;
  }

  update(dt) {
    this.rot += dt / 4000 * Math.PI;
    this.x = 350 * Math.cos(this.rot);
    this.z = 350 * Math.sin(this.rot);
    this.camera.move(this.x, 150, this.z);
  }

}
