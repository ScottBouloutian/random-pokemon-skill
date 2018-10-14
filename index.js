const alexa = require("alexa-app");
const app = new alexa.app("sample");

app.intent("number", {
    "slots": { "number": "AMAZON.NUMBER" },
    "utterances": ["say the number {-|number}"]
  },
  function(request, response) {
    var number = request.slot("number");
    response.say("You asked for the number " + number);
  }
);

exports.handler = app.lambda();
