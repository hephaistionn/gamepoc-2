import Ui from '../core/ui';

export default class Timer extends Ui {

  init(duration) {
    this.end = false;
    this.count = duration;
    this.previous = duration;
    this.run = false;

    this.container = this.makeDom('div', 'timer');
    this.value = this.makeDom('div', 'timer__value');
    this.value.textContent = this.count;
    this.container.appendChild(this.value);

    this.on('start', this.onStart);
    this.on('end', this.onEnd);

    this.hide();
  }

  update(dt) {
    if(!this.run) return;
    this.count -= dt/1000;
    const count = Math.ceil(this.count);
    if(count < this.previous) {
      this.previous = count;
      this.value.textContent = count;
      if(count === 0) {
        this.run = false;
        this.emit('end');
      }
    }
  }

  onStart() {
    this.show();
    this.run = true;   
  }

  onEnd() {
    this.hide();
  }

}

