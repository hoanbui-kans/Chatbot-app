'use strict';

const bot = require('./bot');
const botsetting = require('./botsetting');
const utterance = require('./utterance');
const response = require('./response');
const conservation = require('./conservation');

module.exports = {
  botsetting,
  utterance,
  response, 
  conservation,
  bot
}