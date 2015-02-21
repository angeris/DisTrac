
var container;
var scene;
var rednerer;
var camera;
var controls;
var start = Date.now();

Template.index.rendered = function () {
  Meteor.setTimeout(init, 0);
};


function init() {
  
  
  if(!Detector.webgl){
      Detector.addGetWebGLMessage();
    } else {

      container = $(".container");
      var years = ['1990','1995','2000'];
      var globe = new DAT.Globe(container);
      
      globe.animate();
      document.body.style.backgroundImage = 'none'; // remove loading

      
      
      
      
      /*container.addEventListener('mousedown', onMouseDown, false);

    container.addEventListener('mousewheel', onMouseWheel, false);

    document.addEventListener('keydown', onDocumentKeyDown, false);
    */

/*container.addEventListener('mouseover', function() {
      overRenderer = true;
    }, false);

    container.addEventListener('mouseout', function() {
      overRenderer = false;
    }, false);
    */

      
  }
//  scene = new THREE.Scene();
//  
//  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//  camera.position.y = 150;
//  camera.position.z = 500;
//    
//  renderer = new THREE.CanvasRenderer();
//  console.log(renderer);
//  renderer.setSize(window.innerWidth, window.innerHeight);
//  
//  var light = new THREE.PointLight( 0xffffff);
//  light.position.set(500,500,500);
//  scene.add(light);
//  
//  var geometry = new THREE.CubeGeometry(100,100,100);
//  var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
//  var cube = new THREE.Mesh(geometry, material);
//  scene.add(cube);
  //console.log(cube);
//  
//  console.log(renderer.domElement);
//  container.append(renderer.domElement);
//  

  //var globe = new DAT.Globe( container );
  //console.log(globe);
  
  //renderer.render(scene, camera);

}