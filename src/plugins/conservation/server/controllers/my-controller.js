'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('conservation')
      .service('myService')
      .getWelcomeMessage();
  },
});
