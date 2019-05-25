import ee from './core/eventemitter';
import World from './world';

window.addEventListener('load', () => {
    const scene = new World();

    ee.on('stopScreen', () => {
        scene.stop();
    });

    ee.on('startScreen', () => {
        scene.start();
    });

    ee.emit('startScreen');
});
