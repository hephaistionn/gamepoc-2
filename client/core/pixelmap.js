class PixelMap {

  constructor() {
    this.tileSize = 0;
    this.heightMax = 4;
  }

  async compute(url, ENTITIES) {
    const image = await this.loadImage(url);
    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext('2d');
    context.width = image.width;
    context.height = image.height;
    context.drawImage(image, 0, 0);
    return this.getDataMap(context);
  }

  loadImage(url, cb) {
    return new Promise((resolve) => {
      let image = new Image();
      image.onload = function () {
        resolve(this)
      };
      image.src = url;
    })
  }

  getDataMap(context) {
    const image = context.getImageData(0, 0, context.width, context.height);
    const imageData = image.data;
    const size = context.height * context.width;
    const data = {};
    data.nbZ = context.height;
    data.nbX = context.width;
    const blocks = new Uint8Array(size);
    let index = 0;
    for (let i = 0; i < size; i++) {
      index = i * 4;
      blocks[i] = imageData[index + 0]
    }
    data.blocks = blocks;

    const playerSpawn = [];
    for (let i = 0; i < size; i++) {
      index = i * 4;
      if(imageData[index + 1]===100){
        const x = i % data.nbX + 1 - data.nbX/2;
        const z = Math.floor(i / data.nbX) + 1 - data.nbZ/2;
        playerSpawn.push({x,z});
      }
    }
    data.playerSpawn = playerSpawn;
    return data;
  }
};


module.exports = new PixelMap();
