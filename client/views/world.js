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
import Stats from 'stats.js';
import pixelMap from '../core/pixelmap';
let stats;


export default class World extends View {

  async init(config) {

    const map = await pixelMap.compute('/assets/map3.png');

    this.camera = new Camera({deltaX: 40, deltaY: 40, deltaZ: 40});
    this.light = new Light({ deltaX: -0.2, deltaY: 1, deltaZ: 0 });
    this.ground = new Ground({ x: 0, y: 0, z: 0, size: map?map.nbX:3500 });
    this.feeds = common.populateWithMap(Feed, map);
    this.player = common.populatePlayer(Player, this.ground.size, map, config );
    this.score = new Score();
    this.effect = new Effect();
    this.timer =  new Timer(80);
    this.end = new End(this.player);

    this.add(this.camera);
    this.add(this.light);
    this.add(this.ground);
    this.add(this.player);
    this.add(this.feeds);
    this.initJoystick();

    stats = new Stats();
    stats.showPanel( 0 );
    document.body.appendChild( stats.dom );
  }

  update(dt) {
    this.player.update(dt, this.feeds);
    this.camera.update(dt, this.player);
    this.light.update(dt, this.player);
    this.effect.update(dt, this.camera, this.player.size);
    this.timer.update(dt);
    Feed.update(dt);
    stats.end();
    stats.begin();
  }

  onTouchMouve(force, angle) {
    this.player.setForce(force, angle);  
  }

  onTouchEnd() {
    this.player.setForce(0, 0);
  }

  onEnd() {
    this.player.setForce(0);  
  }

  onDismount() {
    this.remove(this.camera);
    this.remove(this.light);
    this.remove(this.ground);
    this.remove(this.player);
    this.remove(this.feeds);
  }

}

World.prototype.cname = 'world';
