Template.control.rendered = function () {
  $('#ex1').slider({
    formatter: function (value) {
      return 'Current value: ' + value;
    }
  });
}
  
Template.control.helpers({
  totalSusceptible: function() {

  },

  totalInfected: function() {
    var sum = 0;
    console.log(Points.find());
    Points.find().forEach(function(point) {
      console.log(point.count);
      sum += point.count;
    });

    console.log(sum);
    return 100;
  },

  currentDay: function() {
    return 5;
  },
  
  daySliderValue: function() {
    return 5; 
  }
});