'use strict';

/**
 *  router
 */


module.exports = {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/facebook/',
        handler: 'facebook.findMany',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/facebook/',
        handler: 'facebook.create',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'DELETE',
        path: '/facebook/:id',
        handler: 'facebook.delete',
        config: {
          policies: [],
          auth: false,
        },
      },
    ]
  };
