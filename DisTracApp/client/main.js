//Meteor.subscribe('posts');
if (Meteor.isClient) {
  Session.set('pageTitle', 'DisTrac');

  console.log("These are the cities" + cities);
}

Meteor.startup(function () {
  Session.set('currentDay', '1');
});