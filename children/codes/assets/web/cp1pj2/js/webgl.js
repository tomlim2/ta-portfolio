class Sphere{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
  }

  render(){
    rig2 = new THREE.Group();
    rig3t = new THREE.Group();

    scene.add(rig2);
    rig2.position.set(this.x, this.y, this.z)
    //m
    for (let i = 0; i < 10; i++) {
      rig1 = new THREE.Group();
      rig1.rotation.y = 360/10*Math.PI/180*i;
      //mesh
      let geometry = new THREE.SphereGeometry( 5, 30, 30 );
      let material = new THREE.MeshLambertMaterial({color:0xf0f0f0, });

      for (let r = 2; r < datapack.length; r++) {
        let sample = datapack[r][i+3]*5;
        let vertices = geometry.vertices[r*8]
        var vc = new THREE.Vector3(vertices.x,vertices.y,vertices.z);
        var nmvc = vc.normalize();
        var scnmvc = nmvc.addScaledVector(nmvc, sample);
        vertices.addVectors(vertices, scnmvc);
        // console.log(sample)
      }
      // sphereGeo = new THREE.BufferGeometry().fromGeometry( geometry );
      sphereGeo = new THREE.BufferGeometry().fromGeometry( geometry );
      sphere = new THREE.Mesh(sphereGeo, material);
      sphere.position.set(0, 0,50);
      sphere.rotation.x = 180*Math.PI/180;
      sphere.castShadow = true; //default is false
      sphere.receiveShadow = true;
      rig1.add(sphere);


      //label
      var loader = new THREE.FontLoader();

      loader.load( 'fonts/stf_Medium_Regular.json', function ( font ) {
        let geometry = new THREE.TextGeometry( dataheader[0][i+3], {
          font: font,
          size: .5,
          height: .1,
          curveSegments: 0,
          bevelEnabled: false,
          bevelThickness: 0,
          bevelSize: 0,
          bevelSegments: 0

        } );


        geometry.computeBoundingBox()
        var centerOffset = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
        let material = new THREE.MeshLambertMaterial({color:0xf0f0f0, });
        textGeo = new THREE.BufferGeometry().fromGeometry( geometry );
        textMesh1 = new THREE.Mesh(textGeo,material);
        textMesh1.position.set(centerOffset,0,0);

        rig1t = new THREE.Group();
        rig1t.position.set(0,-7,50);
        rig1t.add(textMesh1);

        rig2t = new THREE.Group();
        rig2t.add(rig1t);
        rig2t.rotation.y = 360/10*Math.PI/180*i;

        rig3t.add(rig2t);
        } );
      //labelend
      rig2.add(rig1);
      scene.add(rig3t);
    }
}

  update(){
    // rig2.rotation.y -= .0005
    // sphere.rotation.y += .005;
    rig2.children.forEach(function(child,index){
      child.children.forEach(function(child,index){
          child.rotation.y -= .001;
      })
    })
    rig2.rotation.y += (targetRotation - rig2.rotation.y) * 0.05
    rig3t.rotation.y += (targetRotation - rig3t.rotation.y) * 0.05
  }
}


let datapack = [];
let dataheader = [];
let container;
let camera, scene, light, renderer, sphere, sphereGeo, time, rig1, rig2
let rig1t, rig2t, rig3t, textGeo, textMesh1, centerOffset;

let spheres = [];
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseY = 0;
var mouseXOnMouseDown = 0;
var mouseYOnMouseDown = 0;
var mouseYOnWheel = 0;
var labelRenderer;

var windowHalfX = window.innerWidth/2;
var windowHalfY = window.innerHeight/2;

function init(){
  container = document.createElement('div');
  document.body.appendChild(container);
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);

  document.addEventListener('mousedown',onDocumentMouseDown,false);
  document.addEventListener('touchstart',onDocumentTouchStart,false);
  document.addEventListener('touchmove',onDocumentTouchMove,false);

  fillScene();
}



function fillScene(){

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.008);
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 40000 );
  camera.position.set(0,0,80);
  camera.rotation.set(0,0,0);
  scene.add(camera);

  var spotlight = new THREE.SpotLight(0xff0000, 1);
  spotlight.position.set( -4, 5, 70);
  spotlight.target.position.set( 0,0,0 );
  spotlight.castShadow = true;
  spotlight.angle = 140*Math.PI/180;
  spotlight.penumbra = 0.2;
  spotlight.distance = 100;
  scene.add( spotlight );

  var spotlight = new THREE.SpotLight(0x00ff00, 1);
  spotlight.position.set( 4, -5, 70);
  spotlight.target.position.set( 0,0,0 );
  spotlight.castShadow = true;
  spotlight.angle = 140*Math.PI/180;
  spotlight.penumbra = 0.2;
  spotlight.distance = 100;
  scene.add( spotlight );

  var light = new THREE.HemisphereLight( 0xffbbff, 0xffffbb, .3 );
  scene.add( light );


  spheres.push(new Sphere(0,0,0));
  spheres[0].render();
  // console.log(spheres[0])


}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseDown(event){
  // what is preventDefault?
  event.preventDefault();

  document.addEventListener('mousemove',onDocumentMouseMove,false);
  document.addEventListener('mouseup',onDocumentMouseUp,false);
  document.addEventListener('mouseout',onDocumentMouseOut,false);

  mouseXOnMouseDown = event.clientX - windowHalfX;
  targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove(event){
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
  targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown)* 0.001;
}

function onDocumentMouseUp(event){
  document.removeEventListener('mousemove',onDocumentMouseMove,false);
  document.removeEventListener('mouseup',onDocumentMouseUp,false);
  document.removeEventListener('mouseout',onDocumentMouseOut,false);
}

function onDocumentMouseOut(event){
  document.removeEventListener('mousemove',onDocumentMouseMove,false);
  document.removeEventListener('mouseup',onDocumentMouseUp,false);
  document.removeEventListener('mouseout',onDocumentMouseOut,false);
}

function onDocumentTouchStart(event){
  if(event.touches.length === 1){
    event.preventDefault();
    mouseXOnMouseDown = event.touches[0].pageX-windowHalfX;
    targetRotationOnMouseDown = targetRotation;
  }
}

function onDocumentTouchMove(event){
  if(event.touches.length ===1){
    event.preventDefault();
    mouseX = event.touches[0].pageX-windowHalfX;
    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown)* 0.001;
  }
}

function animate(){
  requestAnimationFrame(animate);
  render();
}

function render(){
  spheres[0].update();
  renderer.render(scene, camera);
}
