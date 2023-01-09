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
        handler: 'facebook.findAllFacebookPage',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/facebook/page/:id',
        handler: 'facebook.findOneFacebookPageById',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/facebook/:id',
        handler: 'facebook.findOneFacebookPage',
        config: {
          policies: [],
          auth: false,
        },
      },
    ]
  };
