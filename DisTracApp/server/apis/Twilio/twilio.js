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

    if (params.func === '')
    // Create the address from twilio parameters.
    var address = (query.FromCity + ', ' + query.FromState + ' ' + query.FromZip).replace(/\s/g, '+');

    // Get Geocoder information on the address using google's geocoder api.
    var geocoder = new GeoCoder();
    var location = geocoder.geocode(address);

    // Latitude and longitude for the message.
    var lat = location[0].latitude;
    var lon = location[0].longitude;


    // Messages.insert({

    // });

    // Comments.insert({
    //   postId: telescopeId,
    //   userId: tom._id,
    //   author: tom.profile.name,
    //   submitted: new Date(now - 5 * 3600 * 1000),
    //   body: 'Interesting project Sacha, can I get involved?'
    // });
    console.log(query);
  }
});