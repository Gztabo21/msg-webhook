const request = require('request');
module.exports = { handleMessage,handlePostback};

  // Handles messages events
function handleMessage(sender_psid, received_message) {

    let res;
    if(received_message.text){
        res = {"text": `You sent the message: "${received_message.text}". Now send me an image!`}
    }
    callSendAPI(sender_psid, res);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

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
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
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
  

