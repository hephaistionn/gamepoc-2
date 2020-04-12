import * as THREE from 'three';
import Feed from '../entities/feed';

class Effect {

  constructor() {
    this.tempo = 0;
    this.intersectionObject1 = null;
    this.intersectionObject2 = null;
  }

  update(dt, camera) {
   this.viewObstructed(dt, camera);
  }

  viewObstructed(dt, camera) {
    this.tempo += dt;
    if(this.tempo > 200) {
      this.tempo = 0;
      if(this.intersectionObject1) {
        this.intersectionObject1.material.opacity = 1;
        this.intersectionObject1 = null;
      }
      if(this.intersectionObject2) {
        this.intersectionObject2.material.opacity = 1;
        this.intersectionObject2 = null;
      }
      const objects = camera.checkIntersection(Feed.elements);
      if(objects[0]) {
        objects[0].object.material.opacity = 0.2;
        this.intersectionObject1 = objects[0].object;
      }
      if(objects[1]) {
        objects[1].object.material.opacity = 0.2;
        this.intersectionObject2 =  objects[1].object;
      }
    }
  }

};

export default Effect;