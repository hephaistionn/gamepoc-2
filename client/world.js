import Scene from './core/scene'
import Camera from './core/camera';
import Light from './core/light';
import Ground from './entities/ground';
import Block from './entities/block';
import Feed from './entities/feed';

export default class World extends Scene {

  init() {
    this.camera = new Camera({ x: 0, y: 40, z: 40, tX: 0, tZ: 0 });
    this.light = new Light({ x: -20, y: 40, z: 20 });
    this.ground = new Ground({ x: 0, y: 0, z: 0 });
    this.block = new Block({ x: 0, y: 0, z: 0 });
    this.feeds = [];


    for(let i=0; i<500; i++) {
      const random = (1 + Math.random() * 2);
      this.feeds[i] = new Feed({
        x: Math.floor((Math.random()-0.5) * 200 ),
        y: 0,
        z: Math.floor((Math.random()-0.5) * 200 ),
        scale: Math.round(random * random * random / 9)
      });
      this.add(this.feeds[i]);
    }

    this.add(this.camera);
    this.add(this.light);
    this.add(this.ground);
    this.add(this.block);
  }

  update(dt) {
    this.block.update(dt);
    this.camera.update(dt);
    this.camera.moveTarget(this.block.x, this.block.y, this.block.z);
    this.light.moveTarget(this.block.x, this.block.y, this.block.z);
    this.camera.scale(this.block.scale);
    this.light.scale(this.block.scale);
    this.block.eat(this.feeds);

    // ne peut manger que les entités de taille inf ou égale.
    // ne peut pas traverser les antitiés de taille superieure.
  }

  onTouchMouve(force, angle) {
    this.block.setForce(force, angle);
  }

  onTouchEnd() {
    this.block.setForce(0, 0);
  }
}
