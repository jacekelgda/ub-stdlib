const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const dialog = require('../../utils/dialog_open.js');

/**
* /hello
*
*   Basic "Hello World" command.
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
  // check if has goals
  // if not create goal with dialog
  // if yes do nothing for now

  //command.trigger_id
  console.log('starting command');
  const dialogContent = {
    "callback_id": "ryde-46e2b0",
    "title": "Request a Ride",
    "submit_label": "Request",
    "elements": [
      {
        "type": "text",
        "label": "Pickup Location",
        "name": "loc_origin"
      },
      {
        "type": "text",
        "label": "Dropoff Location",
        "name": "loc_destination"
      }
    ]
  };
  console.log(dialogContent);
  dialog(
    botToken,
    {
      dialog: dialogContent,
      trigger_id: command.trigger_id
    },
    callback
  );
};
