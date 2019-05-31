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
    this.camera.scale(this.player.scale);
    this.light.scale(this.player.scale);

    for (let i = Feed.dying.length - 1; i > -1; i--) {
      const feed = Feed.dying[i];
      feed.update(dt);
    }
  }

  onTouchMouve(force, angle) {
    this.player.setForce(force, angle);
  }

  onTouchEnd() {
    this.player.setForce(0, 0);
  }

  populate() {

    var categories = [ 
      { value: 1000000000, count: 1 },
      { value: 100000000, count: 2 },
      { value: 10000000, count: 4 },
      { value: 1000000, count: 8 },
      { value: 100000, count: 16 },
      { value: 10000, count: 32 },
      { value: 1000, count: 64 },
      { value: 100, count: 128 },
      { value: 10, count:256 },
      { value: 1, count: 513 }
    ];



    for (let i in categories) {
      const category = categories[i];
      while (category.count) {
        const x = Math.floor((Math.random() - 0.5) * 230);
        const z = Math.floor((Math.random() - 0.5) * 230);
        const feed = new Feed({ x, y: 0, z, value: category.value });
        if (feed.freePosition(this.feeds)) {
          this.feeds.push(feed);
          this.add(feed);
          console.log(category.value + ' count : ' + category.count);
          category.count--
        }
      }
    }
  }
}
