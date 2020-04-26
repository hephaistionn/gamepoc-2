import * as THREE from 'three';
import Feed from '../entities/feed';

class Effect {

  constructor() {
    this.tempo = 0;
    this.intersectionObject1 = null;
    this.intersectionObject2 = null;
  }

  update(dt, camera, size) {
   this.viewObstructed(dt, camera, size);
  }

  viewObstructed(dt, camera, size) {
    this.tempo += dt;
    if(this.tempo > 50) {
      this.tempo = 0;
      const objects = camera.checkIntersection(Feed.elements);

      if(this.intersectionObject1) {
        this.intersectionObject1.material.uniforms.opacity.value = 1;
        this.intersectionObject1.material.transparent = true;
        this.intersectionObject1 = null;
      }
      if(this.intersectionObject2) {
        this.intersectionObject2.material.uniforms.opacity.value = 1;
        this.intersectionObject2.material.transparent = true;
        this.intersectionObject2 = null;
      }

      if(objects[0]) {
        this.intersectionObject1 = objects[0].object;
        objects[0].object.material.uniforms.opacity.value = 0.1;
        objects[0].object.material.transparent = true;
      }
      if(objects[1]) {
        this.intersectionObject2 =  objects[1].object;
        objects[1].object.material.uniforms.opacity.value = 0.1;
        objects[1].object.material.transparent = true;
      }
    }
  }

};

export default Effect;