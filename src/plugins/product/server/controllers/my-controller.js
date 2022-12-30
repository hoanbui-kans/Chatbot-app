'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('product')
      .service('myService')
      .getWelcomeMessage();
  },
});
