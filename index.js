const alexa = require('alexa-app');
const _ = require('lodash');
const packageInfo = require('./package.json');
const Pokedex = require('./src/Pokedex');

const pokedex = new Pokedex();

// Initialize the Alexa app
const AlexaApp = alexa.app;
const app = new AlexaApp('random Pokemon');
app.id = packageInfo.alexa.applicationId;

app.post = (request, response) => {
    // If the device does not support display directives then remove them from the response
    const interfaces = _.get(request, 'data.context.System.device.supportedInterfaces', { });
    if (!('Display' in interfaces)) {
        response.response.response.directives = [];
    }
};

app.launch((request, response) => (
    pokedex.randomPokemon().then((pokemon) => {
        const renderTemplate = {
            type: 'Display.RenderTemplate',
            template: {
                type: 'BodyTemplate2',
                token: 'pocket-monster',
                image: {
                    contentDescription: pokemon.name,
                    sources: [
                        {
                            height: 256,
                            url: pokemon.sprites.front_default,
                            width: 256,
                        },
                    ],
                },
                title: _.capitalize(pokemon.name),
                textContent: {
                    primaryText: {
                        text: `Your random pocket monster is ${pokemon.name}.`,
                        type: 'PlainText',
                    },
                },
            },
        };
        response.directive(renderTemplate);
        response.say(`Your random pocket monster is ${pokemon.name}.`);
    })
));

// Help intent
app.intent('AMAZON.HelpIntent', {
    slots: { },
    utterances: ['help'],
}, (request, response) => {
    const helpOutput = 'You can say "open pocket monster". You can also say stop or exit to quit.';
    const reprompt = 'What would you like to do?';
    response.say(helpOutput).reprompt(reprompt).shouldEndSession(false);
});

// Stop intent
app.intent('AMAZON.StopIntent', {
    slots: {},
    utterances: ['stop'],
}, (request, response) => {
    const stopOutput = 'Don\'t You Worry. I\'ll be back.';
    response.say(stopOutput);
});

// Cancel intent
app.intent('AMAZON.CancelIntent', {
    slots: {},
    utterances: ['cancel'],
}, (request, response) => {
    const cancelOutput = 'No problem. Request cancelled.';
    response.say(cancelOutput);
});

// Error handler
app.error = (exception, request, response) => {
    console.error(exception);
    response.say('Sorry, something bad happened');
};

exports.handler = app.lambda();
