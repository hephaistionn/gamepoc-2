import Ui from '../core/ui';

export default class Home extends Ui {

  init() {
    this.skin = 0;

    this.title = this.makeDom('div', 'home__title', 'Cubix');
    this.buttonStart = this.makeButton('div', 'home__start', 'START', this.start);
    this.buttonNext = this.makeButton('div', 'home__button next', '', this.next);
    this.buttonPrevious = this.makeButton('div', 'home__button previous', '', this.previous);
  }

  start() {
    this.emit('changeView', 'world', {skin:this.skin});
  }

  next() {
    this.skin += 1
    this.skin = Math.min(3, this.skin);
  }

  previous() {
    this.skin -= 1
    this.skin = Math.max(0, this.skin);
  }

  onMount() {
    document.body.appendChild(this.title);
    document.body.appendChild(this.buttonPrevious);
    document.body.appendChild(this.buttonNext);
    document.body.appendChild(this.buttonStart);
  }

 }
