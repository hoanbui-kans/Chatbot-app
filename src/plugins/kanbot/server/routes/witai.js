'use strict';
/**
 *  router
 */

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/witai/find-bot/',
      handler: 'witai.findAllBot',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/witai/create-bot/',
      handler: 'witai.createbot',
      config: {
        policies: [],
        auth: false,
      },
    },
  ]
}
