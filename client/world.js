import Scene from './core/scene'
import Camera from './core/camera';
import Light from './core/light';
import Ground from './entities/ground';
import Player from './entities/player';
import Feed from './entities/feed';

export default class World extends Scene {

  init() {
    this.camera = new Camera({ x: 0, y: 40, z: 40, tX: 0, tZ: 0 });
    this.light = new Light({ x: -20, y: 40, z: 20 });
    this.ground = new Ground({ x: 0, y: 0, z: 0 });
    this.player = new Player({ x: 0, y: 0, z: 0 });
    this.feeds = [];

    for(let i=0; i<500; i++) {
      const random = (1 + Math.random() * 2);
      this.feeds[i] = new Feed({
        x: Math.floor((Math.random()-0.5) * 160 ),
        y: 0,
        z: Math.floor((Math.random()-0.5) * 160 ),
        scale: Math.round(random * random * random / 9)
      });
      this.add(this.feeds[i]);
    }

    this.add(this.camera);
    this.add(this.light);
    this.add(this.ground);
    this.add(this.player);
  }

  update(dt) {
    this.player.update(dt, this.feeds);
    this.camera.update(dt);
    this.camera.moveTarget(this.player.x, this.player.y, this.player.z);
    this.light.moveTarget(this.player.x, this.player.y, this.player.z);
    this.camera.scale(this.player.scale);
    this.light.scale(this.player.scale);
    
  }

  onTouchMouve(force, angle) {
    this.player.setForce(force, angle);
  }

  onTouchEnd() {
    this.player.setForce(0, 0);
  }
}
