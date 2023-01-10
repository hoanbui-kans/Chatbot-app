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
      handler: 'entity.findManyEntity',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/entity/:id',
      handler: 'entity.findOneEntity',
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
    {
      method: 'PUT',
      path: '/entity/:id',
      handler: 'entity.updateEntity',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'DELETE',
      path: '/entity/:id',
      handler: 'entity.deleteEntity',
      config: {
        policies: [],
        auth: false,
      },
    }
  ]
};
