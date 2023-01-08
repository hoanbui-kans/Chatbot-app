'use strict';

/**
 *  router
 */

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/conservation/messaging-webhook/',
      handler: 'conservation.messageHooks',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/conservation/messaging-webhook/',
      handler: 'conservation.incommingMessage',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/conservation/incomming-message/',
      handler: 'conservation.incommingMessage',
      config: {
        policies: [],
        auth: false,
      },
    },
    
  ]
};
