//Meteor.subscribe('posts');
if (Meteor.isClient) {
  Session.set('pageTitle', 'DisTrac');
}

Meteor.startup(function () {
  Session.set('currentDay', '1');
});