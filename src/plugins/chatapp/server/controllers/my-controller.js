'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('chatapp')
      .service('myService')
      .getWelcomeMessage();
  },
});
