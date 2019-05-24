import ee from './core/eventemitter';
import SceneA from './entities/sceneA';

const scene = new SceneA();

ee.on('stopScreen', () => {
    scene.stop();
});

ee.on('startScreen', () => { 
    scene.start();
});

window.addEventListener('load', () => {
    ee.emit('startScreen');
});
