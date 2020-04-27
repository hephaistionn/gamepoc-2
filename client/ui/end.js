import Ui from '../core/ui';

export default class End extends Ui {

  init(player) {
    this.player = player;

    this.container = this.makeDom('div', 'end');
    const modal = this.makeDom('div', 'end__modal');
    const title = this.makeDom('div', 'end__modal__title', 'Gameover');
    this.score = this.makeDom('div', 'end__modal__score', '0');
    const buttonHome = this.makeButton('div', 'end__button', 'RETOUR', this.goHome);

    modal.appendChild(title);
    modal.appendChild(this.score);
    this.container.appendChild(modal);
    this.container.appendChild(buttonHome);

    this.on('end', this.onEnd);

    this.hide();
  }

  onEnd() {
    this.score.textContent = this.player.value;
    this.show();
  }

  goHome(){
    this.emit('changeView', 'home');
  }

}

