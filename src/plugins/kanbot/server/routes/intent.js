'use strict';

/**
 *  router
 */

module.exports =  {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/intent/',
        handler: 'intent.findManyIntent',
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
      {
        method: 'POST',
        path: '/intent/:id/',
        handler: 'intent.deleteIntent',
        config: {
          policies: [],
          auth: false,
        },
      },
    ]
};
