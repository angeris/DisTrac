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
      console.log(Points.find());
      return Points.find().count;
    },
  
});