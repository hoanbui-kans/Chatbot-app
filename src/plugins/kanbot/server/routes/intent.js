'use strict';

/**
 *  router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports =  {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/intent/',
        handler: 'intent.findAllIntent',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/intent/',
        handler: 'intent.createIntent',
        config: {
          policies: [],
          auth: false,
        },
      },
    ]
};
