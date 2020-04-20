import Feed from './entities/feed';
import EventEmitter from 'event-emitter';
const ee = EventEmitter();

const groups = [
  { count: 0, size: 256, value: 16777216 },
  { count: 1, size: 128, value: 2097152 },
  { count: 4, size: 64, value: 262144 },
  { count: 22, size: 32, value: 32768 },
  { count: 70, size: 16, value: 4096 },
  { count: 256, size: 8 , value: 512 },
  { count: 512, size: 4, value: 64 },
  { count: 512, size: 2, value: 8 },
  { count: 512, size: 1, value: 1},  
];

const worldSize = groups[0].size*2;

function validPosition(blocks, x, z, offset) {
  for(let i in blocks) {
    const margin =  blocks[i].size/2 + offset;
    const overlapX = Math.abs(x - blocks[i].x);
    const overlapZ = Math.abs(z - blocks[i].z);
    if(overlapX < margin && overlapZ < margin) {
      return false;
    }
  }
  return true;
}


function populate(player) {
  const feeds = [];

  for(let i=0; i<groups.length; i++) {
    const group = groups[i];
    console.log('group', group.size)
    for(let k=0; k<group.count; k++) {
      let valid = false;
      let attempt = 0;
      let x, z;
      while(!valid) {
        if(attempt > 2500) {
          throw 'too many attempt'
        }
        const area = worldSize-group.size*2;
        x = Math.floor( Math.random()*area/group.size ) * group.size + group.size/2 - area/2; 
        z = Math.floor( Math.random()*area/group.size ) * group.size + group.size/2 - area/2; 
        valid = validPosition(feeds,x,z,group.size+group.size/2);
        attempt++;
      }
      const feed = new Feed({ x, y: 0, z, value: group.value, size:group.size});
      feeds.push(feed);
    }

  }

  let valid = false
  while (player.x === 0 && player.z === 0 && !valid) {
    const area = worldSize-2;
    const x = Math.floor( Math.random()*area ) + 1/2 - area/2; 
    const z = Math.floor( Math.random()*area ) + 1/2 - area/2; 
    valid = validPosition(feeds,x,z,1+1/2);
    player.move(x, z);
  }

  return feeds;
}

export default {
  populate,
  groups,
  worldSize,
  ee
}
