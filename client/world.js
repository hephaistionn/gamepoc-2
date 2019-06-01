import Scene from './core/scene'
import Camera from './core/camera';
import Light from './core/light';
import Ground from './entities/ground';
import Player from './entities/player';
import Feed from './entities/feed';
import Score from './ui/score';

export default class World extends Scene {

  init() {
    this.camera = new Camera({ x: 0, y: 40, z: 40, tX: 0, tZ: 0 });
    this.light = new Light({ x: -20, y: 40, z: 20 });
    this.ground = new Ground({ x: 0, y: 0, z: 0, size: 300 });
    this.player = new Player({ x: 0, y: 0, z: 0, areaSize: 300 });
    this.score = new Score();
    this.feeds = [];
    this.interObject1 = null;
    this.interObject5 = null;
    this.tempo = 0;

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

    this.viewObstructed(dt)

  }

  viewObstructed(dt) {
    this.tempo += dt;
    if(this.tempo > 320) {
      this.tempo = 0;
      if(this.interObject1) {
        this.interObject1.material.opacity = 1;
        this.interObject1 = null;
      }
      if(this.interObject2) {
        this.interObject2.material.opacity = 1;
        this.interObject2 = null;
      }
      const objects = this.camera.checkIntersection(Feed.elements);
      if(objects[0]) {
        objects[0].object.material.opacity = 0.5;
        this.interObject1 = objects[0].object;
      }
      if(objects[1]) {
        objects[1].object.material.opacity = 0.5;
        this.interObject2 =  objects[1].object;
      }
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
