'use strict';

/**
 *  service
 */

const witai = require('./witai');
const intent = require('./intent');
const entity = require('./entity');
const response = require('./response');
const trait = require('./trait');
const role = require('./role');
const utterance = require('./utterance');
const conservation = require('./conservation');
const botsetting = require('./botsetting');

module.exports = {
  witai,
  intent,
  entity,
  response,
  trait,
  role,
  utterance,
  conservation,
  botsetting
}