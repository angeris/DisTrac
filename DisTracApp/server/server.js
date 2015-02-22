if (Meteor.isServer) {
    Meteor.call('initializeModel', function (error, data) {
        if(err) console.log(err);
    });
}