import * as THREE from 'three';
const material = new THREE.MeshPhongMaterial({ color: 0xff0000, transparent: true });
const loaderMap = new THREE.TextureLoader();
loaderMap.load(
  '/assets/cube3.png',
  function ( texture ) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    material.map = texture;
  },
  undefined,
  function ( err ) {
    console.error( 'An error happened.' );
  }
);

export default material;