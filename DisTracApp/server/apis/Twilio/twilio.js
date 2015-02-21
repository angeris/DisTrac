/* Twilio API: Used to send and receive texts from users. */

/* Function: parseMessage(message), parses the given message in order to determine whether
 * or not to store the message or subscribe to the service.
 */
function parseMessage(message) {
  var commandIndex = message.indexOf(':');
  var command = message.substring(0, commandIndex).toLowerCase();

  // Create object to store parameter information.
  var params = {};

  // Get the location if user is subscribing.
  if (command === 'subscribe') {
    var location = message.substring(commandIndex + 1);

    // Grab information on the text and store them in params.
    params.func = 'subscribe';
    params.loc = location;

  // Get the location, disease, and diseaseCount if user is reporting.
  } else if (command === 'report') {
    var firstDelim = message.indexOf(';');
    var secondDelim = message.substring(firstDelim + 1).indexOf(';');

    var location = message.substring(commandIndex + 1, firstDelim).trim();
    message = message.substring(firstDelim + 1);
    var disease = message.substring(0, secondDelim).trim();
    message = message.substring(secondDelim + 1);
    var diseaseCount = message.trim();

    // Grab information on the text and store them in params.
    params.func = 'report';
    params.loc = location;
    params.dis = disease;
    params.disCount = diseaseCount;

  // The user input an invalid text command.
  } else {
    params.func = 'error';
  }

  return params;
}

// Various calls against Twilio API.
Meteor.methods({

  /* handleTwilio: grab the parameters from a twilio text in order to parse the message
   * for the location, phone number, body text, etc, and store in mongodb.
   */
  handleTwilio: function (query) {

    // Parse the message body
    var message = query.Body;
    var params = parseMessage(message);

    // User wants to subscribe.
    if (params.func === 'subscribe') {

      // Latitude and longitude for the message.
      var geocoder = new GeoCoder();
      var location = geocoder.geocode(params.loc);
      var lat = location[0].latitude;
      var lon = location[0].longitude;
      var phoneNum = query.From;

      // Check for existing subscription and halt operation if existing.
      var existingSub = Subscriptions.find({phoneNum: phoneNum});

      if (!existingSub) {
        // Store the subscription in the mongodb database.
        Subscriptions.insert({
          lat: lat,
          lon: lon,
          phoneNum: phoneNum
        });

        // Return a success message.
        return {returnText: 'Subscription Successful'};
      } else {

        // Return that the user has already subscribed.
        return {returnText: 'Already Subscribed'};
      }

    // User wants to report.
    } else if (params.func === 'report') {

      // Latitude and longitude for the message.
      var geocoder = new GeoCoder();
      var location = geocoder.geocode(params.loc);
      var lat = location[0].latitude;
      var lon = location[0].longitude;
      var dis = params.dis;
      var disCount = params.disCount;
      var phoneNum = query.From;

      // Store the report in the mongodb database.
      Reports.insert({
        lat: lat,
        lon: lon,
        dis: dis,
        disCount: disCount,
        phoneNum: phoneNum
      });

      // Return a success message.
      return {returnText: 'Report Successful'};

    // User rauns into an error.
    } else if (params.func === 'error') {

      // Return an error message.
      return {returnText: 'Invalid Input'};

    // Mysterious WTF case.
    } else {
      console.log("Control should never reach this point. A bad error occurred.");
    }
    console.log(query);
  },

  /* alertSubscribers, send a text alert to all of the subscribers in the database, by
   * querying for all subscribers and then sending the associated text to each of them
   * individually. The text should be quite detailed.
   */
  alertSubscribers: function (disease) {

  }
});