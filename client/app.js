import World from './views/world';
import Home from './views/home';
import common from './common';
const ee = common.ee;

window.addEventListener('load', () => {
  let view;

  ee.on('changeView', (viewName, conf) => {
    if (view) view.dismount();

    switch (viewName) {
      case 'home':
        view = new Home(conf);
        break;
      case 'world':
        view = new World(conf);
        break;
    }
  });

  ee.emit('changeView', 'home');
});

