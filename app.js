const request = require('request');
module.exports = { handleMessage,handlePostback};

  // Handles messages events
function handleMessage(sender_psid, received_message) {

    let res;
    if(received_message.text){
        res = {"text": `You sent the message: "${received_message.text}". Now send me an image!`}
    }else if (received_message.attachments) {
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            "attachment": {
              "type": "template",
              "payload": {
                "template_type": "generic",
                "elements": [{
                  "title": "Is this the right picture?",
                  "subtitle": "Tap a button to answer.",
                  "image_url": attachment_url,
                  "buttons": [
                    {
                      "type": "postback",
                      "title": "Yes!",
                      "payload": "yes",
                    },
                    {
                      "type": "postback",
                      "title": "No!",
                      "payload": "no",
                    }
                  ],
                }]
              }
            }
      }
    }
    callSendAPI(sender_psid, res);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    let response;
    let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);

}

// Sends response messages via the Send API
function  callSendAPI(sender_psid, response) {

    let request_body = {
        "recipient": {
          "id": sender_psid
        },
        "message": response
      }

      request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token":'EAAIGqyE2bJEBAAeiQkkBDwreMdcPTnlEMvESWPqKMMt2N60sZCe2KXojKpLUOPZCOkg0iwU5iwzzwCau7SZC5X3grWLPsznvg7ivg8ix1DMOhdvTd3HZC5KIuZAZAq2lCzFOWWnhlFw9CMoKSBxvAD2LrrQNPvm8vDOHwl7va1BAZDZD' },
        "method": "POST",
        "json": request_body
      }, (err, res, body) => {
        if (!err) {
          console.log('message sent!')
        } else {
          console.error("Unable to send message:" + err);
        }
      }); 

}
  

