'use strict';

/**
 *  router
*/

module.exports = {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/response/',
        handler: 'response.findMany',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/response/:id',
        handler: 'response.findOne',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/response/',
        handler: 'response.createResponse',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'PUT',
        path: '/response/',
        handler: 'response.updateResponse',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'DELETE',
        path: '/response/',
        handler: 'response.deleteResponse',
        config: {
          policies: [],
          auth: false,
        },
      }
    ]
};
