import Ui from '../core/ui';

export default class Starter extends Ui {

  init() {
    this.count = 3;

    this.container = this.makeDom('div', 'starter');
    const modal = this.makeDom('div', 'starter__modal');
    const title = this.makeDom('div', 'starter__modal__title', 'READY ?');
    this.timer = this.makeDom('div', 'starter__modal__timer', '0');

    modal.appendChild(title);
    modal.appendChild(this.timer);
    this.container.appendChild(modal);
  }

  update(dt) {
    if(this.count <= 0) return;
    this.count -= dt/1000;
    const count = Math.ceil(this.count);
    this.timer.textContent =  count;
    if(this.count<=0) { 
      this.emit('start');
      this.hide();
    }
  }

}
