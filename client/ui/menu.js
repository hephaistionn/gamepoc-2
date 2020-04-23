import Ui from '../core/ui';
import common from '../common';
const ee = common.ee;

export default class Home extends Ui {

  init() {
    this.skin = 0;

    const title = this.makeDom('div', 'home__title', 'Pixawar');
    const buttonStart =  this.makeDom('div', 'home__button', 'Start');
    const skinManager =  this.makeDom('div', 'home__skin');
    const buttonNext =  this.makeDom('div', 'home__skin__button', 'next');
    const buttonPrevious =  this.makeDom('div', 'home__skin__button', 'previous');

    const canvas = document.getElementsByTagName('canvas')[0];
    skinManager.appendChild(buttonPrevious);
    skinManager.appendChild(buttonNext);
    document.body.insertBefore(title, canvas);
    document.body.appendChild(skinManager);
    document.body.appendChild(buttonStart);

    buttonStart.onclick = ()=>{
      ee.emit('changeView', 'world', {skin:this.skin});
    };

    buttonNext.onclick = ()=>{
      this.skin += 1
      this.skin = Math.min(2, this.skin);
    };

    buttonPrevious.onclick = ()=>{
      this.skin -= 1
      this.skin = Math.max(0, this.skin);
    };
  }

 }
