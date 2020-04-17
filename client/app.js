import World from './views/world';
import Home from './views/home';
import common from './common';
const ee = common.ee;

window.addEventListener('load', () => {
  let view;

  ee.on('changeView', viewName => {
    if (view) view.dismount();

    switch (viewName) {
      case 'home':
        view = new Home(ee);
        break;
      case 'world':
        view = new World(ee);
        break;
    }
  });

  ee.emit('changeView', 'home');
});

