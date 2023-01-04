'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::kanbot.intent', ({ strapi }) => ({

    async findAllIntent (ctx) {
      ctx.body = await strapi
      .plugin('kanbot')
      .service('intent')
      .findAll();
    },
  
    async createIntent (ctx) {
      ctx.body = await strapi
      .plugin('kanbot')
      .service('intent')
      .createEntity();
    },

  
  }));
