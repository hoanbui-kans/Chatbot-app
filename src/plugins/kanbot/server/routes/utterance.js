'use strict';

/**
 *  router
 */

module.exports = {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/utterance/',
        handler: 'utterance.findManyUtterance',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/utterance/:id',
        handler: 'utterance.findOneUtterance',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/utterance/',
        handler: 'utterance.createUtterance',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'PUT',
        path: '/utterance/:id',
        handler: 'utterance.updateUtterance',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'DELETE',
        path: '/utterance/:id',
        handler: 'utterance.deleteUtterance',
        config: {
          policies: [],
          auth: false,
        },
      }
    ]
};
