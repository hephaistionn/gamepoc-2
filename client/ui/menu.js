import ee from '../core/eventemitter';
import config from '../config';


export default class Home {

  constructor() {
    this.dom = makeDom('div', 'home');
    const title = makeDom('div', 'home__title', 'Pixawar');
    const buttonStart =  makeDom('div', 'home__button', 'Start');
    buttonStart.onclick = this.start.bind();
    this.dom.appendChild(title);
    this.dom.appendChild(buttonStart);
    this.dom.style.display = 'none';

    document.getElementById('ui').appendChild(this.dom);
  }

  show() {
    this.dom.style.display = '';
  }

  hide() {
    this.dom.style.display = 'none';
  }

  start() {
    ee.emit('changeView', 'world');
  }
}

function makeDom(tag, classname, text) {
  const node = document.createElement(tag);
  if(classname)
    node.className = classname;
  if(text)
    node.textContent = text;
  return node;
}
