'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('kanbot')
      .service('myService')
      .getWelcomeMessage();
  },
});
