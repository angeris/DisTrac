Template.control.rendered = function () {
  $('#ex1').slider({
    formatter: function (value) {
      return 'Current value: ' + value;
    }
  });
}

Template.control.helpers({

});