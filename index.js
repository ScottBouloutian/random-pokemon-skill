const alexa = require('alexa-app');

const AlexaApp = alexa.app;
const app = new AlexaApp('random Pokemon');

exports.handler = app.lambda();
