var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '33e7b33d-fb17-4e91-8d1a-90699bf1e6d5', //process.env.MICROSOFT_APP_ID, // 
    appPassword: '3pbkfsPz1bM52UPCSbVqO8f' //process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
   // session.send("You said: %s", session.message.text);
//	builder.Prompts.text(session, "How many people are in your party?");

   function (session) {
        builder.Prompts.text(session, 'Hi! I am Saurav. What is your name?');
    },
    // Step 2
    function (session, results) {
        session.endDialog('Hello %s!', results.response);
    }
]);
