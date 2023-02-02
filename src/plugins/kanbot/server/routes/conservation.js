'use strict';

/**
 *  router
 */

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/conservation/messaging-webhook/',
      handler: 'conservation.messageHooks',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/conservation/messaging-webhook/',
      handler: 'conservation.incommingMessage',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/conservation/messaging/:app_id',
      handler: 'conservation.incommingMessageSim',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/conservation/incomming-message/',
      handler: 'conservation.incommingMessage',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/conservation/',
      handler: 'conservation.findManyConservation',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/conservation/:id',
      handler: 'conservation.findOneConservation',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/conservation/intent/:id',
      handler: 'conservation.findOneConservationByIntent',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/conservation/',
      handler: 'conservation.createConservation',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/conservation/:id',
      handler: 'conservation.updateConservation',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'DELETE',
      path: '/conservation/:id',
      handler: 'conservation.deteteConservation',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'DELETE',
      path: '/conservation/messaging/:id',
      handler: 'conservation.deteteMessageConservation',
      config: {
        policies: [],
        auth: false,
      },
    },
    
  ]
};
