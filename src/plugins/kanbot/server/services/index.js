'use strict';

/**
 *  service
 */

const witai = require('./witai');
const intent = require('./intent');
const entity = require('./entity');
const response = require('./response');

module.exports = {
  witai,
  intent,
  entity,
  response
}