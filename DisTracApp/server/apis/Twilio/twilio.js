/* Twilio API: Used to send and receive texts from users. */

// Various calls against Twilio API.
Meteor.methods({

  /* handleTwilio: grab the parameters from a twilio text in order to parse the message
   * for the location, phone number, body text, etc, and store in mongodb.
   */
  handleTwilio: function (query) {
    console.log(query);
  }
});