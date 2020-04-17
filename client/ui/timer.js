import Ui from '../core/ui';
import common from '../common';
const ee = common.ee;

export default class Timer extends Ui {

  init(duration) {
    this.end = false;
    this.count = duration;
    this.previous = duration;

    this.container = this.makeDom('div', 'timer');
    this.value = this.makeDom('div', 'timer__value');
    this.value.textContent = this.count;

    this.container.appendChild(this.value);
    document.body.appendChild(this.container);
  }

  update(dt) {
    if(this.end) return;
    this.count -= dt/1000;
    const count = Math.ceil(this.count);
    if(count < this.previous) {
      this.previous = count;
      this.value.textContent = count;

      if(count === 0) {
        this.end = true;
        ee.emit('end');
      }
    }
  }

}

