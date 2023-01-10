'use strict';

const witai = require('./witai');
const entity = require('./entity');
const intent = require('./intent');
const trait = require('./trait');
const role = require('./role');
const utterance = require('./utterance');
const response = require('./response');
const conservation = require('./conservation');

module.exports = {
  witai,
  intent,
  entity,
  trait,
  role,
  utterance,
  response,
  conservation
}
