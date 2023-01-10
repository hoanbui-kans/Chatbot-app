'use strict';

/**
 *  router
 */

module.exports = {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/trait/',
        handler: 'trait.findManyTrait',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/trait/:id',
        handler: 'trait.findOneTrait',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/trait/',
        handler: 'trait.createTrait',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'PUT',
        path: '/trait/',
        handler: 'trait.updateTrait',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'DELETE',
        path: '/trait/',
        handler: 'trait.deleteTrait',
        config: {
          policies: [],
          auth: false,
        },
      }
    ]
};
