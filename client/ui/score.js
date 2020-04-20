import Ui from '../core/ui';
import common from '../common';
const ee = common.ee;

export default class Score extends Ui {

  init() {
    this.value = 0;
    this.level = 1;
    this.particleCount = 10;
    this.particles = [];
    this.currentParticle = 0;

    this.scoreContainer = this.makeDom('div', 'score');
    this.scoreValue = this.makeDom('div', 'score__value');
    this.particlesContainer = this.makeDom('div', 'paricles');

    this.scoreContainer.appendChild(this.scoreValue);
    document.body.appendChild(this.scoreContainer);
    document.body.appendChild(this.particlesContainer);

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
    this.scoreValue.textContent = 'lvl '+ this.level  + ' score : '+ this.value + '/' +common.groups[this.level].value;
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
}
