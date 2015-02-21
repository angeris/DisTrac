
var container;
var scene;
var rednerer;
var camera;
var controls;
var start = Date.now();

Template.index.rendered = function () {
  init();
};


function init() {
  
  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 150;
  camera.position.z = 500;
    
  renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  var light = new THREE.PointLight( 0xffffff);
  light.position.set(500,500,500);
  scene.add(light);
  
  var geometry = new THREE.CubeGeometry(100,100,100);
  var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  console.log(renderer.domElement);
  $("body").append(renderer.domElement);
  
  //Blaze.render("index", document.body, renderer.domElement, "index");
  //UI.insert(UI.render(renderer.domElement), document.body)

  
  renderer.render(scene, camera);

}

var render = function () {
    requestAnimationFrame(render);

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);
};