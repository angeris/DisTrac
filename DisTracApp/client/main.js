//Meteor.subscribe('posts');
if (Meteor.isClient) {
  Session.set('pageTitle', 'DisTrac');

  console.log(cities);
}

Meteor.startup(function () {
  Session.set('currentDay', '1');
});