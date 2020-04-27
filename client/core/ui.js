import common from '../common';
const ee = common.ee;

export default class Ui {
  constructor(config) {
    this.events = {};
    this.init(config);
  }

  show() {
    this.container.style.display = ''; 
  }

  hide() {
    this.container.style.display = 'none';
  }

  makeDom(tag, classname, text) {
    const node = document.createElement(tag);
    if(classname)
      node.className = classname;
    if(text)
      node.textContent = text;
    return node;
  }

  makeButton(tag, classname, text, func) {
    const node = document.createElement(tag);
    if(classname)
      node.className = classname;
    if(text)
      node.textContent = text;
    if(func)
      node.onclick = func.bind(this);
    return node;
  }

  on(key, func) {
    this.events[key] = func.bind(this);
    ee.on(key, this.events[key]);
  }

  emit(key, arg1, arg2) {
    ee.emit(key, arg1, arg2);
  }

  onMount() {
    document.body.appendChild(this.container);
  }

  onDismount(){
    for(let key in this.events) {
      ee.off(key, this.events[key]);
    }
    if(this.container)
      document.body.removeChild(this.container);
  }

}
