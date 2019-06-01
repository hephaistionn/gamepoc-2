import Scene from './core/scene'
import Camera from './core/camera';
import Light from './core/light';
import Ground from './entities/ground';
import Player from './entities/player';
import Feed from './entities/feed';
import Score from './ui/score';
import { reverse } from 'dns';

export default class World extends Scene {

  init() {
    this.camera = new Camera({ x: 0, y: 40, z: 40, tX: 0, tZ: 0 });
    this.light = new Light({ x: -20, y: 40, z: 20 });
    this.ground = new Ground({ x: 0, y: 0, z: 0, size: 300 });
    this.player = new Player({ x: 0, y: 0, z: 0, areaSize: 300 });
    this.score = new Score();
    this.feeds = [];
    this.interObject = null;

    this.populate();

    this.add(this.camera);
    this.add(this.light);
    this.add(this.ground);
    this.add(this.player);

    this.score.addValue(this.player.scale);
  }

  update(dt) {
    this.player.update(dt, this.feeds);
    this.camera.update(dt);
    this.camera.moveTarget(this.player.x, this.player.y, this.player.z);
    this.light.moveTarget(this.player.x, this.player.y, this.player.z);
    this.camera.scale(0.1+this.player.scale/4);
    this.light.scale(this.player.scale);

    for (let i = Feed.dying.length - 1; i > -1; i--) {
      const feed = Feed.dying[i];
      feed.update(dt);
    }

    if(this.interObject) {
      this.interObject.material.opacity = 1;
    }
    const object = this.camera.checkIntersection(Feed.elements);
    if(object[0]) {
      object[0].object.material.opacity = 0.5;
      this.interObject =  object[0].object;
    }
  }

  onTouchMouve(force, angle) {
    this.player.setForce(force, angle);  
  }

  onTouchEnd() {
    this.player.setForce(0, 0);
  }

  populate() {

    const maxValue = 1000;
    // x * x * x
    var categories = [ 
      { value: maxValue * 1, count: 1 },
      { value: maxValue * 0.729, count: 2 },
      { value: maxValue * 0.512, count: 4 },
      { value: maxValue * 0.343, count: 8 },
      { value: maxValue * 0.216, count: 16 },
      { value: maxValue * 0.125, count: 32 },
      { value: maxValue * 0.064, count: 64 },
      { value: maxValue * 0.027, count: 128 },
      { value: maxValue * 0.008, count: 256 },
      { value: maxValue * 0.001, count: 800 }
    ];


    for (let i in categories) {
      const category = categories[i];
      while (category.count) {
        const x = Math.floor((Math.random() - 0.5) * 180);
        const z = Math.floor((Math.random() - 0.5) * 180);
        const feed = new Feed({ x, y: 0, z, value: category.value });
        if (feed.freePosition(this.feeds)) {
          this.feeds.push(feed);
          this.add(feed);
          category.count--
        }
      }
    }

    let ready = false
    while (this.player.x === 0 && this.player.z === 0) {
      const x = Math.floor((Math.random() - 0.5) * 180);
      const z = Math.floor((Math.random() - 0.5) * 180);
      this.player.move(x, 0, z);
      ready = this.player.freePosition(this.feeds);
    }

  }
}
