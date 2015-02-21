Template.header.helpers({
  activeRouteClass: function() {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();

    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.getName() === name
    });

    // This shorthandedly returns 'active' if the first boolean is true.
    return active && 'active';
  }
});