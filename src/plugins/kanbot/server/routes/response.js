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
        handler: 'response.findManyResponse',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/response/:id',
        handler: 'response.findOneResponse',
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
        path: '/response/:id',
        handler: 'response.updateResponse',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'DELETE',
        path: '/response/:id',
        handler: 'response.deleteResponse',
        config: {
          policies: [],
          auth: false,
        },
      }
    ]
};
