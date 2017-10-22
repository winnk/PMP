'use strict';

var Alexa = require('alexa-sdk');

// const ANSWER_COUNT = 2;
// const GAME_LENGTH = 1;

var counter = 0;

var states = {
    START: "_START",
    QUIZ: "_QUIZ",
    FACTS:"_FACTS",
    INPUTS: "_INPUTS",
    OUTPUS: "_OUTPUTS"
};

var APP_ID = "amzn1.ask.skill.8bc9a7a3-6c83-4d35-a763-46bd5d102139";

const FACTS = require('data/facts.json');
const INPUTS = require('data/inputs');
const GOODBYE = require('data/goodbye.json');
// const DATA = require('data/data.json');
const SKILL_NAME = 'PMP Facts';
const GET_FACT_MESSAGE= "Here's your fact: ";
const HELP_MESSAGE= 'You can say tell me a PM P fact, or, you can say quiz game, or, you can say exit... Which would you like?';
const HELP_REPROMPT='What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const quotes = require('data/data');


// Skill Code --------------------------------------------------
// Routes incoming request based on type (LaunchRequest, IntentRequest,
// etc.)

console.info('Loading function');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
    callback(null, "Success");
    console.info('Handler ran');
};

var handlers = {
    'LaunchRequest': function () {
      this.emit(":tell", "Welcome to PM P now");
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
        'GetFact': function () {
            // Get a random pmp fact from the pmp facts list
            var factIndex = Math.floor(Math.random() * FACTS.length);
            var randomFact = FACTS[factIndex];

            // Create speech output
            const speechOutput = GET_FACT_MESSAGE + randomFact;
            this.emit(':tell', speechOutput, SKILL_NAME, randomFact);
            console.log('Getfact speach output runs');
    },
    'AMAZON.HelpIntent': function () {
       const speechOutput = HELP_MESSAGE;
       const reprompt = HELP_REPROMPT;

       this.response.speak(speechOutput).listen(reprompt);
       this.emit(':responseReady');
   },
   'AMAZON.CancelIntent': function () {
       this.response.speak(STOP_MESSAGE);
       this.emit(':responseReady');
   },
   'AMAZON.StopIntent': function () {
       this.response.speak(STOP_MESSAGE);
       this.emit(':responseReady');
   },
 };
 // saved 1502
