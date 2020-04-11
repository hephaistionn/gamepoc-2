import World from './world';
import populator from './populator';



window.addEventListener('load', () => {
    const world = new World();
    
    populator(world)

    world.start();


});
