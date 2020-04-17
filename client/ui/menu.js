import Ui from '../core/ui';
import common from '../common';
const ee = common.ee;

export default class Home extends Ui {

  init() {
    const title = this.makeDom('div', 'home__title', 'Pixawar');
    const buttonStart =  this.makeDom('div', 'home__button', 'Start');
    const canvas = document.getElementsByTagName('canvas')[0];
    
    document.body.insertBefore(title, canvas);
    document.body.appendChild(buttonStart);

    buttonStart.onclick = ()=>{
      ee.emit('changeView', 'world');
    };
  }

 }
