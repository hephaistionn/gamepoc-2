import World from './views/world';
import Home from './views/home';
import ee from './core/eventemitter';

window.addEventListener('load', () => {
  let view;

  ee.on('changeView', viewName => {
    if (view) view.dismount();

    switch (viewName) {
      case 'home':
        view = new Home();
        break;
      case 'world':
        view = new World();
        break;
    }
  });

  ee.emit('changeView', 'home');
});
