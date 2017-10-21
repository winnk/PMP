'use strict';

var Alexa = require('alexa-sdk');
// const questions = require('./question');

// const ANSWER_COUNT = 2;
// const GAME_LENGTH = 1;
var APP_ID = "amzn1.ask.skill.8bc9a7a3-6c83-4d35-a763-46bd5d102139";


var FACTS = [
          'There are 200 total multiple choice questions which make up the PMP exam',
          '25 randomly placed pretest questions are included, and do not count towards the pass/fail determination',
          'Students have 4 hours to complete the exam',
          'Students must score 61% or higher to pass the exam (106 of 175 questions)',
          'Students may bring blank “scratch” paper with which to draft responses, such as for formula based exam questions.'
      ];
var SKILL_NAME = 'PMP Facts';
var GET_FACT_MESSAGE= "Here's your fact: ";
var HELP_MESSAGE= 'You can say tell me a PMP fact, or, you can say quiz game, or, you can say exit... Which would you like?';
var HELP_REPROMPT='What can I help you with?';
var STOP_MESSAGE = 'Goodbye!';


// //Adding greater variety to endSession
// var GOODBYE = [
//     "OK, later Dude!",
//     "OK, bye for now.",
//     "OK, nice chatting - see you later.",
//     "You bet! See you later.",
//     "OK, no worries. See you later.",
//     "OK, no problem. See you later.",
//     "OK, see you later.",
//     "Sure thing. See you later."
// ];

var data = [
                {Input: "Cost Management Plan",            ProcessGroup: "Determine Budget",      Phase:'Planning'},
                {Input: "Scope Baseline",                  ProcessGroup: "Determine Budget",      Phase:'Planning'},
                {Input: "Activity Cost Estimates",         ProcessGroup: "Determine Budget",      Phase:'Planning'},
                {Input: "Basis of Estimates",              ProcessGroup: "Determine Budget",      Phase:'Planning'},
                {Input: "Project Schedule",                ProcessGroup: "Determine Budget",      Phase:'Planning'},
                {Input: "Resource Calendars",              ProcessGroup: "Determine Budget",      Phase:'Planning'},
                {Input: "Risk Register",                   ProcessGroup: "Determine Budget",      Phase:'Planning'},
                {Input: "Agreements",                      ProcessGroup: "Determine Budget",      Phase:'Planning'},
                {Tool: "Cost Aggregation",                 ProcessGroup: "Determine Budget",      Phase:'Planning'},
                {Tool: "Reserve Analysis",                 ProcessGroup: "Determine Budget",      Phase:'Planning'},
                {Tool: "Expert Judgement",                 ProcessGroup: "Determine Budget",      Phase:'Planning'},
                {Tool: "Historical Relationships",         ProcessGroup: "Determine Budget",      Phase:'Planning'},
                {Tool: "Funding Limit Reconcillation",     ProcessGroup: "Determine Budget",      Phase:'Planning'},
                {Output: "Cost Baseline",                  ProcessGroup: "Determine Budget",      Phase:'Planning'},
                {Output: "Project Funding Requirements",   ProcessGroup: "Determine Budget",      Phase:'Planning'}
          ];


// Skill Code --------------------------------------------------
// Routes incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
var handlers = {
    //This skill will receive a LaunchRequest when the user invokes the skill with the invocation name, but does not provide any command mapping to an intent. For example, open PMPnow
    'LaunchRequest': function () {
      this.emit(":tell", "Welcome to PMPnow"); // Create speech output. This is what Alexa will speak back when the user says "Open PMPnow"
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
