import Ui from '../core/ui';
import common from '../common';
const ee = common.ee;

export default class End extends Ui {

  init(player) {
    this.container = this.makeDom('div', 'end');
    const modal = this.makeDom('div', 'end__modal');
    const title = this.makeDom('div', 'end__modal__title', 'Gameover');
    this.score = this.makeDom('div', 'end__modal__score', '0');
    const buttonHome =  this.makeDom('div', 'end__modal__button', 'Home');

    modal.appendChild(title);
    modal.appendChild(this.score);
    modal.appendChild(buttonHome);
    this.container.appendChild(modal);

    buttonHome.onclick = () => {
      ee.emit('changeView', 'home');
    }

    ee.on('end', () =>{
      this.score.textContent = player.value;
      document.body.appendChild(this.container);
    });
  }

}

