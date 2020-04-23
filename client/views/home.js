import View from '../core/view';
import Light from '../core/light';
import Camera from '../core/camera';
import Menu from '../ui/menu';
import Player from '../entities/player';

export default class Home extends View {

  async init() {
    this.camera = new Camera({deltaX: 10, deltaY: 10, deltaZ: 10});
    this.light = new Light({ deltaX: -0.3, deltaY: 1, deltaZ: 0.3 });
    this.menu = new Menu();

    this.players = [0,1,2,3].map(i => new Player({ x: i*3, y: 0, z: -i*3, skin: i}));
    
    this.add(this.camera);
    this.add(this.light);
    this.add(this.players);
  }

  update(dt) {
    const i =  this.menu.skin;
    const y = this.camera.y;
    let x = this.camera.x;
    let z = this.camera.z;
    x += (i*3-x) * dt * 0.01;
    z += (-i*3-z) * dt * 0.01;
    this.camera.move(x, y, z);
  }

  onDismount() {
    this.remove(this.camera);
    this.remove(this.light);
  }
}

Home.prototype.cname = 'home';
