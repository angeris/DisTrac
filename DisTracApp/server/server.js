if (Meteor.isServer) {
<<<<<<< HEAD
    // Meteor.call('initializeModel', function (error, data) {
    //     if(error) console.log(error);
    // });
=======
    Meteor.call('initializeModel', function (error, data) {
        if(error) console.log(error);
    });
>>>>>>> master
}