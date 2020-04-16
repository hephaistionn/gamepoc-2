import ee from '../core/eventemitter';
import config from '../config';


export default class Home {

  constructor() {
    const title = this.makeDom('div', 'home__title', 'Pixawar');
    const buttonStart =  this.makeDom('div', 'home__button', 'Start');
    buttonStart.onclick = this.start.bind();
    const canvas = document.getElementsByTagName('canvas')[0];
    document.body.insertBefore(title, canvas);
    document.body.appendChild(buttonStart);
  }


  start() {
    ee.emit('changeView', 'world');
  }

  makeDom(tag, classname, text) {
    const node = document.createElement(tag);
    if(classname)
      node.className = classname;
    if(text)
      node.textContent = text;
    return node;
  }
}

