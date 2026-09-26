var container;

var composerScene, composer;

var camera, scene, renderer;
var particleLight1, particleLight2, particleLight3;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var effectVignette

init();
animate();

function init() {
  container = document.getElementById( 'container' );
  document.body.appendChild(container);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  // renderer.gammaInput = true;
  // renderer.gammaOutput = true;
  // renderer.shadowMap.enabled = true;
  // renderer.toneMapping = THREE.ReinhardToneMapping;

  container.appendChild( renderer.domElement );
  //
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  window.addEventListener('resize', onWindowResize,false);

  fillScene();

  //postprocessing
  composer = new THREE.EffectComposer( renderer );
  composer.addPass( new THREE.RenderPass( scene, camera ) );

  shaderVignette = THREE.VignetteShader;
  effectVignette = new THREE.ShaderPass( shaderVignette );

  shaderSepia = THREE.SepiaShader;
  effectSepia = new THREE.ShaderPass( shaderSepia );

  effectSepia.uniforms[ "amount" ].value = 0.4;

  effectVignette.uniforms[ "offset" ].value = 0.95;
  effectVignette.uniforms[ "darkness" ].value = 1.2;

  effectVignette.renderToScreen = true;
  composer.addPass( effectSepia );
  composer.addPass( effectVignette );

}

function fillScene(){
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x021926);

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 250;

  // scene
  particleLight1 = new THREE.Object3D();
  var pointLight = new THREE.PointLight( 0x14c0b2, 1.6, 100, 0.8  );
  var prticle = new THREE.Mesh( new THREE.SphereBufferGeometry( 1, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0x14c0b2 } ) );
  particleLight1.add(pointLight, prticle);
  scene.add( particleLight1 );
  //
  particleLight2 = new THREE.PointLight( 0x0040ff, 1.6, 100, 0.8 );
  particleLight2.add( new THREE.Mesh( new THREE.SphereBufferGeometry( 1, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
  scene.add( particleLight2 );

  particleLight3 = new THREE.PointLight( 0xf7592a, 1.6, 100, 0.8 );
  particleLight3.add( new THREE.Mesh( new THREE.SphereBufferGeometry( 1, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xf7592a } ) ) );
  scene.add( particleLight3 );

  // camera.add( new THREE.AmbientLight( 0x222222 ) );
  scene.add( camera );

  // texture

  // model
  object1 = new THREE.Object3D();
  scene.add( object1 );

  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setPath( 'assets/web/bluecat/3d/' );
  mtlLoader.load( '3_lowpolyisland2_forweb_v3.mtl', function( materials ) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( 'assets/web/bluecat/3d/' );
    objLoader.load( '3_lowpolyisland2_forweb_v3.obj', function ( object ) {
      object.position.set(60,-20,0);
      object.rotation.set(0,180*Math.PI/180,0);
      object.scale.set(85,85,85);
      object1.add( object );
    });
  });
}

function onWindowResize(){
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  composer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouseX = (  event.clientX - windowHalfX  )/2;
  mouseY = (  event.clientY - windowHalfY  )/2;
}

//

function animate() {
  requestAnimationFrame( animate );
  render();

}

function render() {
  camera.position.x += ( mouseX - camera.position.x ) * .06;
  camera.position.y += ( - mouseY - camera.position.y ) * .06;

  camera.lookAt( scene.position );

  var timer = Date.now() * 0.00012;
  particleLight1.position.x = Math.sin( timer * 7 ) * 80;
  particleLight1.position.y = Math.cos( timer * 5 ) * 60;
  particleLight1.position.z = Math.cos( timer * 3 ) * 80;

  particleLight2.position.x = Math.cos( timer * 3 ) * 60;
  particleLight2.position.y = Math.sin( timer * 5 ) * 80;
  particleLight2.position.z = Math.sin( timer * 7 ) * 60;

  particleLight3.position.x = Math.sin( timer * 7 ) * 60;
  particleLight3.position.y = Math.cos( timer * 3 ) * 80;
  particleLight3.position.z = Math.sin( timer * 5 ) * 60;

  renderer.render( scene, camera );
  composer.render();
}
