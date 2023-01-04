'use strict';

/**
 *  router
 */

module.exports = {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/entity/',
        handler: 'entity.findAllEntity',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/entity/',
        handler: 'entity.createEntity',
        config: {
          policies: [],
          auth: false,
        },
      },
    ]
  }
  
