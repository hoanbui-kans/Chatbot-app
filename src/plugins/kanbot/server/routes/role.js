'use strict';

/**
 *  router
 */

module.exports = {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/:app_id/role/',
        handler: 'role.findManyRole',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/role/:id',
        handler: 'role.findOneRole',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/role/',
        handler: 'role.createRole',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'PUT',
        path: '/role/:id',
        handler: 'role.updateRole',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'DELETE',
        path: '/role/:id',
        handler: 'role.deleteRole',
        config: {
          policies: [],
          auth: false,
        },
      }
    ]
};
