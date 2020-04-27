import Ui from '../core/ui';

export default class Score extends Ui {

  init() {
    this.value = 0;
    this.level = 1;
    this.particleCount = 10;
    this.particles = [];
    this.currentParticle = 0;

    this.container = this.makeDom('div', 'score');
    this.scoreValue = this.makeDom('div', 'score__value', '0');
    this.particlesContainer = this.makeDom('div', 'paricles');

    this.container.appendChild(this.scoreValue);

    this.on('scored', this.onScore);
    this.on('start', this.onStart);
    this.on('end', this.onEnd);
    this.on('leveled', this.onLeveled);

    this.hide();
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
    /*document.body.appendChild(this.particlesContainer);
    for(let i=0; i<this.particleCount; i++) {
      const node = this.makeDom('div', 'paricles__particle', '+1');
      this.particles.push(node);
      this.particlesContainer.appendChild(node);
    }*/
  }

  onScore(data) {
    this.updateParticle(data.value);
    this.value = data.sum;
    this.scoreValue.textContent = this.value;
  }

  onStart() {
    this.show();
  }

  onEnd() {
    this.hide();
  }

  onLeveled(level) {
    this.level = level; 
  }

}
