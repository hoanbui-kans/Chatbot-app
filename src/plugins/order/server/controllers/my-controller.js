'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('order')
      .service('myService')
      .getWelcomeMessage();
  },
});
