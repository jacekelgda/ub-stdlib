/**
  Slack Format Message Utility

  Format a message into the correct format Slack expect (from raw text or
    proper object).

  For full documentation see: https://api.slack.com/methods/chat.postMessage
*/

const FIELDS = [
  'dialog',
  'trigger_id'
];

module.exports = (token, text) => {

  // Set defaults
  let data = {
    token
  };

  if (text && typeof text === 'object') {
    data = FIELDS.reduce((data, f) => {
      if (f in text) {
        data[f] = text[f]
      }
      return data;
    }, data);
  }

  if (data.dialog) {
    data.dialog = JSON.stringify(data.dialog);
  }

  return data;

};
