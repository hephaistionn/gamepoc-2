import World from './views/world';
import Home from './views/home';
import common from './common';
import textures from './shaders/textures';
const ee = common.ee;

window.addEventListener('load', async () => {
  let view;

  await textures.initTextures();

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

