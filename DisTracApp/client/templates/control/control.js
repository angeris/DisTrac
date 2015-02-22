Template.control.rendered = function () {
  Session.set('currentDay', '1');
}

Template.control.events({
  'change #ex1': function (evt) {
    var val = Math.round(parseInt(evt.currentTarget.value) / 100 * 40);
    Session.set('currentDay', val);
  }
});

Template.control.helpers({
  totalSusceptible: function() {

  },

  totalInfected: function() {
    var sum = 0;
    Points.find().forEach(function(point) {
      if (point.time == Session.get('currentDay')) {
        sum += point.count;
      }
    });
    return sum;
  },

  currentDay: function() {
    return Session.get('currentDay');
  },
  
  daySliderValue: function() {
    return 5; 
  },
  
  runBox: function() {
    
  }
});