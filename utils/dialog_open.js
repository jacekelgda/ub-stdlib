/**
  Slack Message Utility

  Sends a message as your bot user, provided the appropriate bot token.
  For full documentation see: https://api.slack.com/methods/chat.postMessage
*/

const request = require('request');
const formatDialog = require('./format_dialog.js');

module.exports = (token, text, callback) => {
  console.log('inside dialog open');
  let data = formatDialog(token, text);
  if (!text) {
    return callback(null, data);
  }

  // If no token, assume development
  if (!token) {
    console.log('Warning: No token provided for message');
    return callback(null, data);
  }
  console.log('will post');
  request.post({
    uri: 'https://slack.com/api/dialog.open',
    form: data
  }, (err, result) => {
    console.log('got back result');
    if (err) {
      console.log(err);
      return callback(err);
    }

    let body;
    try {
      body = JSON.parse(result.body);
      console.log('Dialog result:', body);
    } catch (e) {
      body = {}
    }

    if (!body.ok) {
      console.log(body);
      return callback(new Error(body.error ? `Slack Error: ${body.error}` : 'Invalid JSON Response from Slack'));
    }

    callback(null, data);

  });

};
