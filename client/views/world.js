import View from '../core/view'
import common from '../common';

import Effect from '../core/effect';
import Light from '../core/light';
import Camera from '../core/camera';
import Ground from '../entities/ground';
import Player from '../entities/player';
import Feed from '../entities/feed';
import Score from '../ui/score';
import Timer from '../ui/timer';
import End from '../ui/end';


export default class World extends View {

  init() {
    this.camera = new Camera({deltaX: 40, deltaY: 40, deltaZ: 40});
    this.light = new Light({ deltaX: -0.3, deltaY: 1, deltaZ: 0.3 });
    this.ground = new Ground({ x: 0, y: 0, z: 0, size: common.worldSize });
    this.player = new Player({ x: 0, y: 0, z: 0, areaSize: common.worldSize });
    this.score = new Score();
    this.effect = new Effect();
    this.timer =  new Timer(60);
    this.end = new End(this.player);
    this.feeds = common.populate(this.player);
    this.tempo = 0;

    this.add(this.camera);
    this.add(this.light);
    this.add(this.ground);
    this.add(this.player);
    this.add(this.feeds);
    this.initJoystick();
  }

  update(dt) {
    this.player.update(dt, this.feeds);
    this.camera.update(dt, this.player);
    this.light.update(dt, this.player);
    this.effect.update(dt, this.camera );
    this.timer.update(dt);
    Feed.update(dt);
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
