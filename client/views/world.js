import common from '../common';
import View from '../core/view'
import Effect from '../core/effect';
import Light from '../core/light';
import Camera from '../core/camera';
import Ground from '../entities/ground';
import Player from '../entities/player';
import Feed from '../entities/feed';
import Score from '../ui/score';
import Timer from '../ui/timer';
import End from '../ui/end';
import pixelMap from '../core/pixelmap';
import Starter from '../ui/starter';


export default class World extends View {

  async init(config) {

    const map = await pixelMap.compute('/assets/map3.png');

    this.camera = new Camera({deltaX: 40, deltaY: 40, deltaZ: 40});
    this.light = new Light({ deltaX: -0.2, deltaY: 1, deltaZ: 0 });
    this.ground = new Ground({ x: 0, y: 0, z: 0, size: map?map.nbX:3500 });
    this.feeds = common.populateWithMap(Feed, map);
    this.player = common.populatePlayer(Player, this.ground.size, map, config );
    this.effect = new Effect();
    this.score = new Score();
    this.timer =  new Timer(75);
    this.starter = new Starter();
    this.end = new End(this.player);

    this.add(this.camera);
    this.add(this.light);
    this.add(this.ground);
    this.add(this.player);
    this.add(this.feeds);
    this.add(this.score);
    this.add(this.timer);
    this.add(this.starter);
    this.add(this.end);
  }

  update(dt) {
    this.player.update(dt, this.feeds);
    this.camera.update(dt, this.player);
    this.light.update(dt, this.player);
    this.effect.update(dt, this.camera, this.player.size);
    this.timer.update(dt);
    this.starter.update(dt);
    Feed.update(dt);
  }

  onTouchMouve(force, angle) {
    this.player.setForce(force, angle);  
  }

  onTouchEnd() {
    this.player.setForce(0, 0);
  }

}

World.prototype.cname = 'world';
