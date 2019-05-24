export default class Scene {

  constructor() {
    this.requestAnimation = null;
    this.init();
  }

  start() {
    let time;
    const update = ()=>{
      this.requestAnimation = requestAnimationFrame(update);
      const now = new Date().getTime();
      let dt = now - (time || now);
      time = now;
      dt = Math.min(dt, 100);
      this.update(dt);
    };
    update();
  }

  update(dt) {
    
  }

  stop() {
    cancelAnimationFrame(requestAnimation);
  }

}
