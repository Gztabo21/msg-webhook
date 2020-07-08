const express = require('express');
const bodyParser = require('body-parser'); 
const  ActivitiesBot = require('./app');
const app = express().use(bodyParser.json());

//endpoint
app.post('/webhook',(req, res) =>{
    let body = req.body; 
    //verifica si hay alguna subcripcion a la pagina
    if(body.object === 'page') {
        //interamos sobre las entradas
        body.entry.forEach( entry => {
            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhookEvent = entry.messaging[0];
            console.log(webhookEvent)
            //get sender_psid
            let sender_psid = webhookEvent.sender.id;

            if(webhookEvent.message){
                ActivitiesBot.handleMessage(sender_psid, webhookEvent.message);
            }else if(webhookEvent.postback){
                ActivitiesBot.handlePostback(sender_psid, webhookEvent.postback);
            }
           
        });
        res.status(200).send('EVENT_RECEIVED');

    }else{
        // si no error 404
        res.sendStatus(404)
    }
});

app.get('/webhook',(req,res) => {

    let VERIFY_TOKEN = "<YOUR_VERIFY_TOKEN>";

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
    
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
        
        } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
        }
    }
    /* frase  EAAIGqyE2bJEBAMdg0hGMzVcmykINsUdcGsZCFXDUalWW7cu1XPthhkZAR8OOMYezZAolZBhytFkKRLZBfWUAAgESA0KpmwL4rFNpIpUAmN4SsS85EDa1lOslNNbZAkqt9uZB4OFntfMcLUNW8yx426BLyISdnIBXAga4eXc6BZBqqQZDZD */
    /* EAAIGqyE2bJEBAMcfXd6GZBXDFIoZC1ZCSMtsxpED4vRxAz4NW40Tj1bLAZBMDRmZByD6ks3PZBv8hSkNoGuPDvX5dmTTs9QqMouJciYkzyU6SUuhDZCD1wZAnuPJaIp8WZCsie0fSJCSZAdDTyS82OIQXS5OX1VHYRMbi0sCc3uk8zWQZDZD */
});

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337,()=>console.log('server is online'));