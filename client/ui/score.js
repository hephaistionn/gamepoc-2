import ee from '../core/eventemitter';
import config from '../config';

export default class Score {

  constructor() {
    this.domParticles = document.getElementById('particles');
    this.value = 0;
    this.level = 1;
    this.particleCount = 10;
    this.particles = [];
    this.currentParticle = 0;

    const scoreContainer = this.makeDom('div', 'score');
    const scoreValue = this.makeDom('div', 'score__value');
    scoreContainer.appendChild(scoreValue);
    document.body.appendChild(scoreContainer);
    
    const particlesContainer = this.makeDom('div', 'paricles');
    document.body.appendChild(particlesContainer);

    this.particlesContainer = particlesContainer;
    this.scoreContainer = particlesContainer;
    this.scoreValue = scoreValue;

    this.prepareParticle();

    ee.on('scored', data =>{
      this.updateScore(data.sum, data.value);
    });

    ee.on('leveled', level =>{
      this.level = level; 
    });

    this.updateScore(0, 0);
  }

  updateScore(sum, value) {
    this.updateParticle(value);
    this.value = sum;
    this.scoreValue.textContent = 'lvl '+ this.level  + ' score : '+ this.value + '/' +config.categories[this.level].value;
  }

  updateParticle(value) {
    /*value = Math.floor(value*100)/100;
    const particle = this.particles[this.currentParticle];
    particle.textContent = '+'+value;
    particle.className ='particle';
    this.currentParticle++;
    if(this.currentParticle >= this.particleCount)  this.currentParticle = 0;
    setTimeout(()=> {
      particle.className ='particle animation';
    },1)*/

  }

  prepareParticle() {
    for(let i=0; i<this.particleCount; i++) {
      const node = this.makeDom('div', 'paricles__particle', '+1');
      this.particles.push(node);
      this.particlesContainer.appendChild(node);
    }
  }

  makeDom(tag, classname, text) {
    const node = document.createElement(tag);
    if(classname)
      node.className = classname;
    if(text)
      node.textContent = text;
    return node;
  }

}
