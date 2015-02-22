if (Meteor.isServer) {
  Meteor.call('initializeModel', function (error, data) {
      if(error) console.log(error);
  });

  Meteor.publish('reports', function () {
    return Reports.find();
  });

  Meteor.publish('subscriptions', function () {
    return Subscriptions.find();
  });

  Meteor.publish('points', function () {
    return Points.find();
  });
}