import * as THREE from 'three';

const list = {};

function load(url) {
  return new Promise(function(resolve, reject) {
    const loaderMap = new THREE.TextureLoader();
    loaderMap.load(
      url,
      function ( texture ) {
        resolve(texture);
      },
      undefined,
      function ( err ) {
        reject();
        console.error( 'An error happened.' );
      }
    );
  });
}

async function initTextures() {
  const mapCube = await load('/assets/cube3.png');
  mapCube.wrapS = mapCube.wrapT = THREE.RepeatWrapping;
  list.mapCube = mapCube;
}

export default {
  list,
  initTextures
};
