import EventEmitter from 'event-emitter';
const ee = EventEmitter();

const groups = [
  { size: 256, value: 16777216 },
  { size: 128, value: 2097152 },
  { size: 64, value: 262144 },
  { size: 32, value: 32768 },
  { size: 16, value: 4096 },
  { size: 8 , value: 512 },
  { size: 4, value: 64 },
  { size: 2, value: 8 },
  { size: 1, value: 1 },  
];


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

function populateRadius(Feed) {
  groups.forEach(group => {group.area = Math.floor(200 * (1+2*group.size/256))});
  groups.forEach((group, i) => {group.count = Math.pow(i,2)*12});
  groups.reverse().reduce( (sum, group) => { group.initArea =  sum;  return  sum + group.area;}, 0);
  groups.reverse();

  function randomPositonInArea(group, i) {
    const blockSize = group.size;
    let areaMin = group.initArea;
    const prod = Math.random();
    if(prod>0.6 &&  groups[i+3]) {
      areaMin = groups[i+3].initArea
    } else if(Math.random()>0.55 && groups[i+2]) {
      areaMin = groups[i+2].initArea
    } else if(Math.random()>0.35 && groups[i+1]) {
      areaMin = groups[i+1].initArea
    }
    let pos;
    const angle = Math.random()*Math.PI*2 ;
    const radius = areaMin + (Math.random()*group.area);
    pos = {
      x: Math.round( ( Math.cos(angle)*radius )/blockSize) * blockSize,
      z: Math.round( ( Math.sin(angle)*radius )/blockSize) * blockSize,
    };
    return pos;
  }

  const feeds = [];

  for(let i=0; i<groups.length; i++) {
    const group = groups[i];
    for(let k=0; k<group.count; k++) {
      let valid = false;
      let attempt = 0;
      let pos;
      while(!valid) {
        if(attempt > 1000) {
          throw 'too many attempt'
        }
        pos = randomPositonInArea(group, i);
        valid = validPosition(feeds,pos.x,pos.z,group.size+group.size/2);
        attempt++;
      }
      const feed = new Feed({ x:pos.x, y: 0, z:pos.z, value: group.value, size:group.size});
      feeds.push(feed);
    }

  }

  return feeds;
}


function populateWithMap(Feed, map) {
  const feeds = [];
  const blocks = map.blocks;
  for (let i = 0; i < blocks.length; i++) {
    if(blocks[i]) {
      const group = groups[groups.length - blocks[i]];
      const x = i % map.nbX + group.size/2 - map.nbX/2;
      const z = Math.floor(i / map.nbX) + group.size/2 - map.nbZ/2;
      const feed = new Feed({ x, y: 0, z, value: group.value, size:group.size});
      feeds.push(feed);
    }
  }
  return feeds;
}

function populatePlayer(Player, areaSize, map) {
  const playerSpawn = map.playerSpawn[Math.floor(Math.random()*map.playerSpawn.length-0.001)];
  return new Player({ x: playerSpawn.x, y: 0, z: playerSpawn.z, areaSize, skin:0 });
}

export default {
  populateWithMap,
  populateRadius,
  populatePlayer,
  groups,
  ee
}
