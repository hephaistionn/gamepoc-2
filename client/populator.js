
import Feed from './entities/feed';

export default populate

function populate(world) {

  const maxValue = 1000;
  var categories = [ 
    { value: maxValue * 1, count: 1 },
    { value: maxValue * 0.729, count: 2 },
    { value: maxValue * 0.512, count: 4 },
    { value: maxValue * 0.343, count: 8 },
    { value: maxValue * 0.216, count: 16 },
    { value: maxValue * 0.125, count: 32 },
    { value: maxValue * 0.064, count: 64 },
    { value: maxValue * 0.027, count: 128 },
    { value: maxValue * 0.008, count: 256 },
    { value: maxValue * 0.001, count: 800 }
  ];


  for (let i in categories) {
    const category = categories[i];
    while (category.count) {
      const x = Math.floor((Math.random() - 0.5) * 180);
      const z = Math.floor((Math.random() - 0.5) * 180);
      const feed = new Feed({ x, y: 0, z, value: category.value });
      if (feed.freePosition(world.feeds)) {
        world.feeds.push(feed);
        world.add(feed);
        category.count--
      }
    }
  }

  let ready = false
  while (world.player.x === 0 && world.player.z === 0 && !ready) {
    const x = Math.floor((Math.random() - 0.5) * 180);
    const z = Math.floor((Math.random() - 0.5) * 180);
    world.player.move(x, 0, z);
    ready = world.player.freePosition(world.feeds);
  }

}