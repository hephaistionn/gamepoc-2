export default class Ui {
  constructor(config) {
    this.init(config);
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
