var dummyCities = [121.47,  31.23,
72.82 ,18.96,
67.01 ,24.86,
-58.37,  -34.61
,77.21 ,28.67
,29  ,41.1
,120.97,  14.62
,-46.63 , -23.53
,37.62 ,55.75
,90.39 ,23.7
,126.99,  37.56
,3.35  ,6.5
,15.32 ,-4.31
,139.77 , 35.67
,-99.14 , 19.43
,106.83  ,-6.18
,-73.94  ,40.67
,51.43 ,35.67
,31.25 ,30.06
,-77.05,  -12.07
,116.4 ,39.93
,-0.1  ,51.52
,-74.09 , 4.63
,74.35 ,31.56
,-43.2 ,-22.91
,44.44, 33.33
,77.56 ,12.97
,-70.64 , -33.46
,88.36 ,22.57
,103.85 , 1.3
,-79.38  ,43.65
,96.15 ,16.79
,3.93  ,7.38
,46.77 ,24.65
,80.27 ,13.09
,106.58  ,29.57
,106.69  ,10.78
,108.9 ,34.27
,114.27  ,30.58
,29.95 ,31.22
,30.32 ,59.93
,78.48 ,17.4
,104.07 , 30.67
,-4.03 ,5.33
,-118.41, 34.11
,18.46 ,-33.93
,13.38 ,52.52];

var cities = [];
var citiesNum = 0;
for(var i = 1; i <= 30; i++) {
  //var dummyCitiesCopy = dummyCities;
  var resultsCities = [];

  for(var j = 0; j < dummyCities.length; j += 2) {
      citiesNum = j / 2;
        var dummyCount = cities[i-1][citiesNum*3] + Math.round(Math.random() * 5);// : Math.round(Math.random() * 5);
        
      //var dummyCount = (citiesNum != 0) ? cities[citiesNum] + Math.round(Math.random() * 5) : Math.round(Math.random() * 5);
//      if (j > dummyCitiesCopy.length / 3) {
//        dummyCount = 0;
//      }
      resultsCities.push(dummyCities[j+1]);
      resultsCities.push(dummyCities[j]);
      resultsCities.push(dummyCount);
    }
  /*if (i <= 10) {
    for(var j = 0; j < dummyCitiesCopy.length; j += 2) {
      var dummyCount = citiesNum != 0 ? cities[citiesNum - 1] + Math.round(Math.random() * 5) : Math.round(Math.random() * 5);
//      if (j > dummyCitiesCopy.length / 3) {
//        dummyCount = 0;
//      }
      resultsCities.push(dummyCitiesCopy[j + 1]);
      resultsCities.push(dummyCitiesCopy[j]);
      resultsCities.push(dummyCount);
    }
  } /*else if (i <= 20) {
    for(var j = 1; j <= dummyCitiesCopy.length; j += 2) {
      if (Math.random() < 0.3) {
        var dummyCount = citiesNum != 0 ? cities[citiesNum - 1] - Math.round(Math.random() * 2) : Math.round(Math.random() * 5);
      } else {
        var dummyCount = citiesNum != 0 ? cities[citiesNum - 1] + Math.round(Math.random() * 5) : Math.round(Math.random() * 5);
      }
      resultsCities.push(dummyCitiesCopy[j - 1]);
      resultsCities.push(dummyCitiesCopy[j]);
      resultsCities.push(dummyCount);
    }
  } else {
    for(var j = 1; j <= dummyCitiesCopy.length; j += 2) {
      if (Math.random() < 0.5) {
        var dummyCount = citiesNum != 0 ? cities[citiesNum - 1] + Math.round(Math.random() * 3) : Math.round(Math.random() * 5);
      } else {
        var dummyCount = citiesNum != 0 ? cities[citiesNum - 1] - Math.round(Math.random() * 1) : Math.round(Math.random() * 5);
      }
      resultsCities.push(dummyCitiesCopy[j - 1]);
      resultsCities.push(dummyCitiesCopy[j]);
      resultsCities.push(dummyCount);
    }
  }*/

  citiesNum += 1;
  cities.push([i, resultsCities]);
}

// var sampleData = [[0,[
//   6,159,0,
//   30,99,0,
//   45,-109,10,
//   42,115,0,
//   4,-54,18,
//   -16,-67,10,
//   21,-103,0,
//   -20,-64,8,
//   -40,-69,10,
//   32,64,5
//  ]],
//                   [5,[
//   6,159,10,
//   30,99,0,
//   45,-109,10,
//   42,115,0,
//   4,-54,18,
//   -16,-67,20,
//   21,-103,0,
//   -20,-64,8,
//   -40,-69,10,
//   32,64,5
//  ]],
//                   [7,[
//   6,159,21,
//   30,99,20,
//   45,-109,10,
//   42,115,0,
//   4,-54,18,
//   -16,-67,50,
//   21,-103,9,
//   -20,-64,11,
//   -40,-69,11,
//   32,64,24
//  ]],
//                   [10,[
//   6,159,21,
//   30,99,20,
//   45,-109,17,
//   42,115,16,
//   4,-54,18,
//   -16,-67,60,
//   21,-103,13,
//   -20,-64,14,
//   -40,-69,15,
//   32,64,24
//  ]]
// ];