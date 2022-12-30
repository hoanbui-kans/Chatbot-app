'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('connection')
      .service('myService')
      .getWelcomeMessage();
  },
});
