'use strict';
/**
 *  router
 */

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/witai/',
      handler: 'witai.findManyWitAi',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/witai/:id',
      handler: 'witai.findOneWitAi',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/witai/app/:appname',
      handler: 'witai.findOneWitAiByAppName',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/witai/',
      handler: 'witai.createWitAi',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/witai/:id',
      handler: 'witai.updateWitAi',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'DELETE',
      path: '/witai/:id',
      handler: 'witai.deleteWitAi',
      config: {
        policies: [],
        auth: false,
      },
    }
  ]
}
