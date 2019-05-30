import ee from '../core/eventemitter';

export default class Score {

  constructor(config) {
    this.domValue = document.getElementById('score_value');
    this.domParticles = document.getElementById('particles');
    this.value = 0;
    this.particleCount = 10;
    this.particles = [];
    this.currentParticle = 0;

    this.prepareParticle();
    ee.on('scored', value =>{
      this.addValue(value);
    })
  }

  addValue(value) {
    this.value += value;
    this.value = Math.floor(this.value*100)/100;
    this.domValue.textContent = this.value;
    this.updateParticle(value)
  }

  updateParticle(value) {
    value = Math.floor(value*100)/100;
    const particle = this.particles[this.currentParticle];
    particle.textContent = '+'+value;
    particle.className ='particle';
    this.currentParticle++;
    if(this.currentParticle >= this.particleCount)  this.currentParticle = 0;
    setTimeout(()=> {
      particle.className ='particle animation';
    },1)
    
  }

  prepareParticle(value) {
    for(let i=0; i<this.particleCount; i++) {
      const node = document.createElement('div');
      node.className = 'particle';
      node.textContent = '+1';
      this.particles.push(node);
      this.domParticles.appendChild(node);
    }
  }

}
