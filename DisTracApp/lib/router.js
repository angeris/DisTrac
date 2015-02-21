Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  template: 'index'
});

// Router Endpoint for Twilio.
Router.route('/api/text', {
  where: 'server',
  name: 'twilioText',
  action: function () {

    // Create upper context to form response objects.
    var upperContext = this;

    // Send the request data to Twilio Handler on backend.
    Meteor.call('handleTwilio', this.request.query, function (error, data) {

      // Set head to be xml format, readable by twilio.
      upperContext.response.writeHead(200, {
        'Content-Type': 'text/xml'
      });

      // Create a TwimlResponse to send back to the calling user.
      var resp = new Twilio.TwimlResponse();
      resp.sms(data.returnText);
      console.log(resp.toString());
      upperContext.response.end(resp.toString());
    });
  }
});