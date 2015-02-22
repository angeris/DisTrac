
var container;
var scene;
var rednerer;
var camera;
var controls;
var start = Date.now();
var gui;

var years;

Template.index.rendered = function () {
  Meteor.setTimeout(init, 0);
};

globeData = function() {
      this.message = 'dat.gui';
      this.time = 4;
      this.displayOutline = false;
      this.devLog = 1;
      this.totalInfected = 8;
      this.totalRecovered = 0;
      this.totalSusceptible = 1000;
};

globeDataObj = new globeData();

function init() {
  
  if(!Detector.webgl){
      Detector.addGetWebGLMessage();
    } else {

      container = $(".container");
      var globe = window.globe = new DAT.Globe(container);
      
      var i, tweens = [];
      years = [];
      var data;
      
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
      data = sampleData;
      
      globeDataObj.totalInfected = 0;
      
      for(i=0; i < data.length; i++) {
        years[i] = data[i][0];
        
        for(j=2; j < data[i][1].length; j+=3) {
           globeDataObj.totalInfected += data[i][1][j];
        }
        
      }
      
      
      var settime = function(globe, t) {
        return function() {
            
          // MAKE SURE the array is sorted by the years!!!
          
          // This gives t as the max value in the years array less than t
          for (i = t; i >= 0; i--) {
            if ((i <= Math.max.apply(null, years)) && ($.inArray(i, years) != -1)) {
              t = i;
              break;
            }
          }            
          // Here we set the time!!!!
          globeData.time = t;
          
          new TWEEN.Tween(globe).to({time: t / years.length}, 500).easing(TWEEN.Easing.Cubic.EaseOut).start();
          
          // Update the infected count!!!
          globeDataObj.totalInfected = 0;

          var index = $.inArray(t, years);
          for(j=2; j < data[index][1].length; j+=3) {
            globeDataObj.totalInfected += data[index][1][j];
          }
          
        };
      };
      
      TWEEN.start();
    
      
      
      window.data = data;
      for (i=0; i < data.length; i++) {
        globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
      }
      globe.createPoints();
      settime(globe,0)();
     
      document.body.style.backgroundImage = 'none';
      
      globe.animate();
      
      

      gui = new dat.GUI();
 
      gui.add(globeDataObj, 'totalInfected').listen();
      var totalRecovered = gui.add(globeDataObj, 'totalRecovered');
      var totalSusceptible = gui.add(globeDataObj, 'totalSusceptible');
      var time = gui.add(globeDataObj, 'time').min(0).max(30).step(1);
      
      var devGui = gui.addFolder('Dev');
      devGui.add(globeDataObj, 'devLog');
      
      // This function gets called when you change the time slider
      time.onChange(function(value) {
        settime(globe, value)();
      });
      
      
      // Screw around with the DAT gui
      Meteor.setTimeout(style, 1000);
      

      
  }
  function style () {
    $(".dg.main.a").css("width", "345px");
    
    //$(".cr:not(.closed)").css("padding-top", "10px").css("padding-bottom", "10px");
    
    //$(".cr.closed").css("padding-top", "0px").css("padding-bottom", "0px");
  }
}