'use strict';

const witai = require('./witai');
const intent = require('./intent');
const entity = require('./entity');
const trait = require('./trait');
const utterance = require('./utterance');
const role = require('./role');
const response = require('./response');

module.exports = {
  witai,
  intent,
  entity,
  trait,
  utterance,
  role,
  response
}