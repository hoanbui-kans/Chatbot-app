'use strict';

/**
 *  router
 */

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/botsetting/:id',
      handler: 'botsetting.getSetting',
      config: {
        policies: [],
        auth: false,
      }
    }
  ]
};
