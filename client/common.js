import Feed from './entities/feed';
import EventEmitter from 'event-emitter';
const ee = EventEmitter();

const categories = [
  { count: 512, factor: 1, value: 1},
  { count: 256, factor: 2, value: 8 },
  { count: 128, factor: 4, value: 64 },
  { count: 64, factor: 8 , value: 512 },
  { count: 32, factor: 16, value: 4096 },
  { count: 16, factor: 32, value: 32768 },
  { count: 8, factor: 64, value: 262144 },
  { count: 1, factor: 128, value: 2097152 },
  { count: 0, factor: 256, value: 16777216 },
];

const worldSize = categories[categories.length-1].factor*2;

function populate(player) {
  const feeds = [];
  const total = categories.length-1;
  for (let i=total; i>-1; i--) {
    const category = categories[i];
    let attempt = 0;
    let count = category.count;
    while (count) {
      let x, z;
      if(category.factor===128) {
        if(Math.random()>0.5) {
          x = Math.floor((Math.random() - 0.5) * (worldSize-(category.factor*3)));
          z = Math.floor(-0.5 * (worldSize-category.factor));
        } else {
          x = Math.floor(-0.5 * (worldSize-category.factor));
          z = Math.floor((Math.random() - 0.5) * (worldSize-(category.factor*3)));
        }
      } else {
        x = Math.floor((Math.random() - 0.5) * (worldSize-category.factor));
        z = Math.floor((Math.random() - 0.5) * (worldSize-category.factor));
      }

      const feed = new Feed({ x, y: 0, z, value: category.value, scale:category.factor});
      if (feed.freePosition(feeds)) {
        feeds.push(feed);
        count--
      } else {
        attempt++
        if(attempt > 400) {
          throw 'too many attempt for lel '+i;
          break;
          
        }
      }
    }
  }

  let ready = false
  while (player.x === 0 && player.z === 0 && !ready) {
    const x = Math.floor((Math.random() - 0.5) * worldSize*0.95);
    const z = Math.floor((Math.random() - 0.5) * worldSize*0.95);
    player.move(x, 0, z);
    ready = player.freePosition(feeds);
  }

  return feeds;
}

export default {
  populate,
  categories,
  worldSize,
  ee
}
