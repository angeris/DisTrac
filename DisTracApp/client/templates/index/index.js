// Make the globe a 'global' variable, "get it?"
globe = null;
points = null;

/* Template.rendered, this function should run only after the entire template has
 * already been loaded. Meaning that the DOM should be manipulable.
 */
Template.index.rendered = function () {
  var container = $("#main");
  globe = new DAT.Globe(container);

  // Setup reactive datasource to continuously grab points.
  Tracker.autorun(function() {
    
    var i = 0;
    Points.find().forEach(function (point) {
      console.log(point);
      points[i] = point; i++;
    });
    console.log(points);

    // Create the WebGL object if it doesn't already exist.
    if (!Detector.webgl) {
      Detector.addGetWebGLMessage();
    } else {

      var data = sampleData;
      for (var i = 0; i < data.length; i++) {
        globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
      }

      globe.createPoints();
      globe.animate();
    }
  });
  
  alertify.log("Hello there!");
  Meteor.setInterval(function() {
    alertify.log("Paris has 9 confirmed new cases");
  }, 10000);
  
}

// globeData = function() {
//   this.message = 'DisTrac Outbreak Simulator';
//   this.time = 4;
//   this.incrementTime = false;
//   this.displayOutline = false;
//   this.totalInfected = 8;
//   this.totalRecovered = 0;
//   this.totalSusceptible = 1000;
//   this.daysToRecovery = 10;

// };

// globeDataObj = new globeData();

// function init() {

//   if(!Detector.webgl){
//       Detector.addGetWebGLMessage();
//     } else {

//       container = $(".container");
//       var globe = window.globe = new DAT.Globe(container);

//       var i, tweens = [];
//       years = [];
//       var data;

//       // This ain't workin
// /*      var xhr = new XMLHttpRequest();
//       xhr.open('GET', '/public/populationdata.json', true);
//       xhr.onreadystatechange = function(e) {
//         if (xhr.readyState === 4) {
//           if (xhr.status === 200) {
//             var data = JSON.parse(xhr.responseText);
//             window.data = data;
//             for (i=0; i < data.length; i++) {
//               globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
//             }
//             globe.createPoints();
//             settime(globe,0)();
//             globe.animate();
//             document.body.style.backgroundImage = 'none'; // remove loading
//           }
//         }
//       };
//       xhr.send(null);
// */


//       // This ain't working either!
// /*    HTTP.get(Meteor.absoluteUrl("/public/populationdata.json"), function(err,result) {
//           console.log(result.data);
//       });
// */
//       // Whatever man screw loading from files
//       data = sampleData;

//       globeDataObj.totalInfected = 0;

//       for(i=0; i < data.length; i++) {
//         years[i] = data[i][0];

//         for(j=2; j < data[i][1].length; j+=3) {
//            globeDataObj.totalInfected += data[i][1][j];
//         }

//       }


//       settime = function(globe, t) {
//         return function() {

//           // MAKE SURE the array is sorted by the years!!!
//           // This gives t as the max value in the years array less than t
//           for (i = t; i >= 0; i--) {
//             if ((i <= Math.max.apply(null, years)) && ($.inArray(i, years) != -1)) {
//               t = i;
//               break;
//             }
//           }
//           var index = $.inArray(t, years);

//           // Here we set the time!!!!
//           globeData.time = t;

//           new TWEEN.Tween(globe).to({time: index / years.length}, 500).easing(TWEEN.Easing.Cubic.EaseOut).start();

//           // Update the infected count!!!
//           globeDataObj.totalInfected = 0;

//           //var index = $.inArray(t, years);
//           for(j=2; j < data[index][1].length; j+=3) {
//             globeDataObj.totalInfected += data[index][1][j];
//           }

//         };
//       };

//       TWEEN.start();



//       window.data = data;
//       for (i=0; i < data.length; i++) {
//         globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
//       }
//       globe.createPoints();
//       settime(globe,0)();

//       document.body.style.backgroundImage = 'none';

//       globe.animate();



//       // Live stuff maybe?
//       /* data.push([14,[
//         6,159,35,
//         30,99,34,
//         45,-109,17,
//         42,115,16,
//         4,-54,58,
//         -16,-67,30,
//         -20,-64,32,
//         -40,-69,45,
//         32,64,45
//        ]]);

//       Meteor.setTimeout(function() {
//         console.log("ADDING");
//         globe.addData(data[4][1], {format: 'magnitude', name: data[4][0], animated: true});
//         globe.createPoints();
//       }, 8000);

//       */


//       gui = new dat.GUI();

//       gui.add(globeDataObj, 'message');
//       gui.add(globeDataObj, 'totalInfected').listen();
//       var totalRecovered = gui.add(globeDataObj, 'totalRecovered');
//       var totalSusceptible = gui.add(globeDataObj, 'totalSusceptible');
//       var time = gui.add(globeDataObj, 'time').min(0).max(100).step(1).listen();
//       var incrementTime = gui.add(globeDataObj, 'incrementTime').listen();

//       var devGui = gui.addFolder('Advanced');
//       var daysToRecovery = devGui.add(globeDataObj, 'daysToRecovery');

//       // This function gets called when you change the time slider
//       time.onChange(function(value) {
//         settime(globe, value)();
//       });

//       daysToRecovery.onChange(function(value) {
//         globeDataObj.daysToRecovery = value;
//       });

//       incrementTime.onChange(function(value) {
//         if(value === true) {
//           // Increment the time
//           timer = Meteor.setInterval(function() { globeDataObj.time++; settime(globe, globeDataObj.time)();}, 3000);
//         } else {
//           Meteor.clearInterval(timer);
//         }
//       });


//       // Screw around with the DAT gui
//       Meteor.setTimeout(style, 1000);





//   }
//   function style () {
//     $(".dg.main.a").css("width", "345px");

//     //$(".cr:not(.closed)").css("padding-top", "10px").css("padding-bottom", "10px");

//     //$(".cr.closed").css("padding-top", "0px").css("padding-bottom", "0px");

//   }
// };
