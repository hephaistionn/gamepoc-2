import World from './world';
import config from './config';



window.addEventListener('load', () => {
    const world = new World();
    
    config.populate(world)

    world.start();


});
