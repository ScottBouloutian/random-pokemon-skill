const alexa = require('alexa-app');
const _ = require('lodash');
const packageInfo = require('./package.json');

// Initialize the Alexa app
const AlexaApp = alexa.app;
const app = new AlexaApp('random Pokemon');
app.id = packageInfo.alexa.applicationId;

app.post = (request, response) => {
    // If the device does not support display directives then remove them from the response
    const interfaces = _.get(request, 'System.device.supportedInterfaces', { });
    if (!('display' in interfaces)) {
        response.response.response.directives = [];
    }
};

// Help intent
app.intent('AMAZON.HelpIntent', {
    slots: { },
    utterances: [],
}, (request, response) => {
    const helpOutput = 'You can say "open pocket monster". You can also say stop or exit to quit.';
    const reprompt = 'What would you like to do?';
    response.say(helpOutput).reprompt(reprompt).shouldEndSession(false);
});

// Stop intent
app.intent('AMAZON.StopIntent', {
    slots: {},
    utterances: [],
}, (request, response) => {
    const stopOutput = 'Don\'t You Worry. I\'ll be back.';
    response.say(stopOutput);
});

// Cancel intent
app.intent('AMAZON.CancelIntent', {
    slots: {},
    utterances: [],
}, (request, response) => {
    const cancelOutput = 'No problem. Request cancelled.';
    response.say(cancelOutput);
});

// Launch intent
app.launch((request, response) => {
    response.say();
});

exports.handlerl = app.lambda();
