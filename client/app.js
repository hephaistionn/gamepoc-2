import World from './views/world';
import Home from './views/home';
import common from './common';
const ee = common.ee;

window.addEventListener('load', () => {
  let view;

  ee.on('changeView', async (viewName, conf) => {
    if (view) view.dismount();

    switch (viewName) {
      case 'home':
        view = new Home();
        break;
      case 'world':
        view = new World();
        break;
    }
    await view.init(conf);
    view.start();

  });

  ee.emit('changeView', 'home');
});

