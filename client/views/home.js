import View from '../core/view';
import Light from '../core/light';
import Camera from '../core/camera';
import config from '../config';
import Menu from '../ui/menu';


export default class Home extends View {

  init() {
    this.camera = new Camera({deltaX: 40, deltaY: 40, deltaZ: 40});
    this.light = new Light({ deltaX: -0.3, deltaY: 1, deltaZ: 0.3 });
    this.menu = new Menu();

    this.add(this.camera);
    this.add(this.light);
  }

  update(dt) {

  }

  onDismount() {
    this.remove(this.camera);
    this.remove(this.light);
  }
}
