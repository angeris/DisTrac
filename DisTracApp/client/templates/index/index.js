
var container;
var scene;
var rednerer;
var camera;
var controls;
var start = Date.now();
var gui;

Template.index.rendered = function () {
  Meteor.setTimeout(init, 0);
};


var FizzyText = function() {
  this.message = 'dat.gui';
  this.speed = 0.8;
  this.displayOutline = false;
  // Define render logic ...
};
  
function init() {
  
  
  if(!Detector.webgl){
      Detector.addGetWebGLMessage();
    } else {

      container = $(".container");
      var years = ['1990','1995','2000'];
      var globe = new DAT.Globe(container);
      
      var i, tweens = [];
      var data;
      
      var settime = function(globe, t) {
        return function() {
          new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
        };
      };


      
      // This ain't workin
/*      var xhr = new XMLHttpRequest(); 
      xhr.open('GET', '/public/populationdata.json', true);
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            window.data = data;
            for (i=0; i < data.length; i++) {
              globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
            }
            globe.createPoints();
            settime(globe,0)();
            globe.animate();
            document.body.style.backgroundImage = 'none'; // remove loading
          }
        }
      };
      xhr.send(null);
*/
      
      
      // This ain't working either!
/*    HTTP.get(Meteor.absoluteUrl("/public/populationdata.json"), function(err,result) {
          console.log(result.data);
      });
*/
      

      // Whatever man screw loading from files
      data = popData;
      window.data = data;
      for (i=0; i < data.length; i++) {
        globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
      }
      globe.createPoints();
      settime(globe,1)();
     
      document.body.style.backgroundImage = 'none';
      
      globe.animate();
      
      
      
      
      
      
      
      
      gui = new dat.GUI();
      var text = new FizzyText();
 
      gui.add(text, 'message');
      gui.add(text, 'speed', -5, 5);
      gui.add(text, 'displayOutline');
      
      // Screw around with the DAT gui
      Meteor.setTimeout(style, 1000);
      

      
  }
  function style () {
    $(".dg.main.a").css("width", "345px");
    
    //$(".cr:not(.closed)").css("padding-top", "10px").css("padding-bottom", "10px");
    
    //$(".cr.closed").css("padding-top", "0px").css("padding-bottom", "0px");
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