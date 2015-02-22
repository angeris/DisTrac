/* Wolfram API: Used to query the wolfram database for health information. */

// Load Future().
Future = Npm.require('fibers/future');

// Various calls against the Wolfram API.
Meteor.methods({

  getDiseaseInfo: function (disease) {
    var future = new Future();
    var wolframAPI = Meteor.npmRequire('wolfram').createClient(WOLFRAM_API_KEY);
    var diseaseQuery = disease + ' most common symptoms';
    var diseaseInfo = null;

    // Run http call to wolfram and ask future to wait until result is available.
    wolframAPI.query(diseaseQuery, function (error, result) {
      if (error) {
        console.log(error);
      }
      future.return(result[0].subpods[0].value + " " + result[1].subpods[0].value);
    });

    return future.wait();
  }
});