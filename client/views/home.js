import Scene from '../core/scene'
import config from '../config';
import Menu from '../ui/menu';


export default class Home extends Scene {

  init() {
    this.camera = new Camera({deltaX: 40, deltaY: 40, deltaZ: 40});
    this.light = new Light({ deltaX: -0.3, deltaY: 1, deltaZ: 0.3 });
    this.menu = new Menu();

    this.add(this.camera);
    this.add(this.light);
  }

  update(dt) {

  }

  dismount() {
    this.remove(this.camera);
    this.remove(this.light);
    this.stop();
  }
}
